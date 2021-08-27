from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.supply_categoryModel import Supply_Categories

from models.Admin import supply_categoryModel
from schemas.Admin import supply_categorySchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/supply_categories',
    tags=['supply_category'],
    # dependencies=[Depends(get_token)]
)

#================================ Supply_Category Table =================================#

# Supply_Categories DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Supply_Categories.supply_category_id.like('%' + user_input + '%'),
                    Supply_Categories.supply_category_name.like('%' + user_input + '%'),
                    Supply_Categories.supply_category_description.like('%' + user_input + '%'),
                    Supply_Categories.created_at.like('%' + user_input + '%'),
                    Supply_Categories.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Supply_Categories, db.query(Supply_Categories), 
        [
            'supply_category_id',
            'supply_category_name',
            'supply_category_description',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all
@router.get('/')
def get_all_supply_category(db: Session = Depends(get_db)):
    user = db.query(supply_categoryModel.Supply_Categories).all()
    return {'Supply_Categories': user}

# GET one Supply by ID
@router.get('/{supply_category_id}')
def get_one_supply_category(supply_category_id:str, db: Session = Depends(get_db)):
    sc = db.query(supply_categoryModel.Supply_Categories).filter(supply_categoryModel.Supply_Categories.supply_category_id == supply_category_id).first()
    if not sc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Supply Category with the id {supply_category_id} is not available")
    return sc

# CREATE Supply Category
@router.post('/')
def create_supply_category(request: supply_categorySchema.CreateSupplyCategory, db: Session = Depends(get_db)):
    to_store = supply_categoryModel.Supply_Categories(
        supply_category_name = request.supply_category_name,
        supply_category_description = request.supply_category_description,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Supply Category stored successfully.'}

# UPDATE supply category
@router.put('/{supply_category_id}')
def update_supply_category(supply_category_id: str, supply_c: supply_categorySchema.UpdateSupplyCategory, db: Session = Depends(get_db)): 
    if not db.query(supply_categoryModel.Supply_Categories).filter(supply_categoryModel.Supply_Categories.supply_category_id == supply_category_id).update({
        'supply_category_name': supply_c.supply_category_name,
        'supply_category_description': supply_c.supply_category_description,
    }):
        raise HTTPException(404, 'Supply Category to update is not found')
    db.commit()
    return {'message': 'Supply Category updated successfully.'}

# DELETE Supply Category
@router.delete('/{supply_category_id}')
def delete_supply_category(supply_category_id: str, db: Session = Depends(get_db)):
    if not db.query(supply_categoryModel.Supply_Categories).filter(supply_categoryModel.Supply_Categories.supply_category_id == supply_category_id).delete():
        raise HTTPException(404, 'Supply Category to delete is not found')
    db.commit()
    return {'message': 'Supply Category removed successfully.'}

