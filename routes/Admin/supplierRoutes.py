from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.supplierModel import Suppliers

from models.Admin import supplierModel
from schemas.Admin import supplierSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/suppliers',
    tags=['supplier'],
    # dependencies=[Depends(get_token)]
)

#================================ Supplier Table =================================#

# Suppliers DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Suppliers.supplier_id.like('%' + user_input + '%'),
                    Suppliers.supplier_name.like('%' + user_input + '%'),
                    Suppliers.supplier_contact.like('%' + user_input + '%'),
                    Suppliers.supplier_email.like('%' + user_input + '%'),
                    Suppliers.supplier_description.like('%' + user_input + '%'),
                    Suppliers.created_at.like('%' + user_input + '%'),
                    Suppliers.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Suppliers, db.query(Suppliers), 
        [
            'supplier_id',
            'supplier_name',
            'supplier_contact',
            'supplier_email',
            'supplier_description',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)


# GET all Supplier
@router.get('/')
def get_all_supplier(db: Session = Depends(get_db)):
    user = db.query(supplierModel.Suppliers).all()
    return {'Suppliers': user}

# GET one Supplier by ID
@router.get('/{supplier_id}')
def get_one_supplier(supplier_id:str, db: Session = Depends(get_db)):
    sc = db.query(supplierModel.Suppliers).filter(supplierModel.Suppliers.supplier_id == supplier_id).first()
    if not sc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Supplier with the id {supplier_id} is not available")
    return sc

# CREATE Supplier
@router.post('/')
def create_supplier(request: supplierSchema.CreateSupplier, db: Session = Depends(get_db)):
    to_store = supplierModel.Suppliers(
        supplier_name = request.supplier_name,
        supplier_contact = request.supplier_contact,
        supplier_email = request.supplier_email,
        supplier_description = request.supplier_description,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Supplier stored successfully.'}

# UPDATE Supplier
@router.put('/{supplier_id}')
def update_supplier(supplier_id: str, supplier: supplierSchema.UpdateSupplier, db: Session = Depends(get_db)): 
    if not db.query(supplierModel.Suppliers).filter(supplierModel.Suppliers.supplier_id == supplier_id).update({
        'supplier_name': supplier.supplier_name,
        'supplier_contact': supplier.supplier_contact,
        'supplier_email': supplier.supplier_email,
        'supplier_description': supplier.supplier_description,
        
    }):
        raise HTTPException(404, 'Supplier to update is not found')
    db.commit()
    return {'message': 'Supplier updated successfully.'}

# DELETE Supplier
@router.delete('/{supplier_id}')
def delete_supplier(supplier_id: str, db: Session = Depends(get_db)):
    if not db.query(supplierModel.Suppliers).filter(supplierModel.Suppliers.supplier_id == supplier_id).delete():
        raise HTTPException(404, 'Supplier to delete is not found')
    db.commit()
    return {'message': 'Supplier removed successfully.'}

