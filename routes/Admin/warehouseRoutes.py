from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.warehouseModel import Warehouses
from models.Admin.employeeModel import Employees

from models.Admin import warehouseModel
from schemas.Admin import warehouseSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/warehouses',
    tags=['warehouse'],
    # dependencies=[Depends(get_token)]
)

#================================ Warehouses Table =================================#


# Warehouses DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def get_full_name(employee_last_name, employee_first_name, employee_middle_name):
            full_name = Employees.employee_last_name() + ", " + Employees.employee_first_name() + " " + Employees.employee_middle_name
            return full_name
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Warehouses.warehouse_id.like('%' + user_input + '%'),
                    Employees.employee_last_name.like('%' + user_input + '%'),
                    Employees.employee_first_name.like('%' + user_input + '%'),
                    Employees.employee_middle_name.like('%' + user_input + '%'),
                    Warehouses.warehouse_name.like('%' + user_input + '%'),
                    Warehouses.warehouse_description.like('%' + user_input + '%'),
                    Warehouses.warehouse_address.like('%' + user_input + '%'),
                    Warehouses.warehouse_contact.like('%' + user_input + '%'),
                    Warehouses.created_at.like('%' + user_input + '%'),
                    Warehouses.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Warehouses, db.query(Warehouses), 
        [
            'warehouse_id',
            ('warehouse_manager_id', 'manager.employee_last_name'),
            'warehouse_name',
            'warehouse_description',
            'warehouse_address',
            'warehouse_contact',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all Warehouse
@router.get('/')
def get_all_warehouse(db: Session = Depends(get_db)):
    warehouse = db.query(warehouseModel.Warehouses).options(joinedload(warehouseModel.Warehouses.manager)).all()
    return {'Warehouses': warehouse}

# GET one Warehouse by ID
@router.get('/{warehouse_id}', response_model=warehouseSchema.ShowWarehouse)
def get_one_warehouse(warehouse_id:str, db: Session = Depends(get_db)):
    wh = db.query(warehouseModel.Warehouses).filter(warehouseModel.Warehouses.warehouse_id == warehouse_id).first()
    if not wh:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Warehouse with the id {warehouse_id} is not available")
    return wh

# CREATE Warehouse
@router.post('/')
def create_warehouse(request: warehouseSchema.CreateWarehouse, db: Session = Depends(get_db)):
    to_store = warehouseModel.Warehouses(
        warehouse_manager_id = request.warehouse_manager_id,
        warehouse_name = request.warehouse_name,
        warehouse_description = request.warehouse_description,
        warehouse_address = request.warehouse_address,
        warehouse_contact = request.warehouse_contact,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Warehouse stored successfully.'}

# UPDATE warehouse
@router.put('/{warehouse_id}')
def update_warehouse(warehouse_id: str, warehouse: warehouseSchema.UpdateWarehouse, db: Session = Depends(get_db)): 
    if not db.query(warehouseModel.Warehouses).filter(warehouseModel.Warehouses.warehouse_id == warehouse_id).update({
        'warehouse_name': warehouse.warehouse_name,
        'warehouse_description': warehouse.warehouse_description,
        'warehouse_address': warehouse.warehouse_address,
        'warehouse_contact': warehouse.warehouse_contact,
        
    }):
        raise HTTPException(404, 'Warehouse to update is not found')
    db.commit()
    return {'message': 'Warehouse updated successfully.'}

# DELETE Warehouse
@router.delete('/{warehouse_id}')
def delete_warehouse(warehouse_id: str, db: Session = Depends(get_db)):
    if not db.query(warehouseModel.Warehouses).filter(warehouseModel.Warehouses.warehouse_id == warehouse_id).delete():
        raise HTTPException(404, 'Warehouse to delete is not found')
    db.commit()
    return {'message': 'Warehouse removed successfully.'}

