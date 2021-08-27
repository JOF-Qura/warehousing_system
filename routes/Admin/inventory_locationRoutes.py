from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.inventory_locationModel import Inventory_Locations
from models.Admin.supply_categoryModel import Supply_Categories

from models.Admin import inventory_locationModel
from schemas.Admin import inventory_locationSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/inventory_locations',
    tags=['inventory_location'],
    # dependencies=[Depends(get_token)]
)

#================================ Inventory_Locations Table =================================#

# Inventory_Locations DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Inventory_Locations.inventory_location_id.like('%' + user_input + '%'),
                    Inventory_Locations.inventory_location_name.like('%' + user_input + '%'),
                    Supply_Categories.supply_category_name.like('%' + user_input + '%'),
                    Inventory_Locations.created_at.like('%' + user_input + '%'),
                    Inventory_Locations.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Inventory_Locations, db.query(Inventory_Locations), 
        [
            'inventory_location_id',
            'inventory_location_name',
            ('supply_category_id', 'inventory_location_category.supply_category_name'),
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all Inventory_Locations
@router.get('/')
def get_all_inventory_location(db: Session = Depends(get_db)):
    inv_loc = db.query(inventory_locationModel.Inventory_Locations).options(joinedload(inventory_locationModel.Inventory_Locations.inventory_location_category)).all()
    return {'Inventory_Locations': inv_loc}

# GET Inventory_Locations by ID
@router.get('/{inventory_location_id}', response_model=inventory_locationSchema.ShowInventoryLocation)
def get_one_inventory_location(inventory_location_id:str, db: Session = Depends(get_db)):
    inventory_loc = db.query(inventory_locationModel.Inventory_Locations).filter(inventory_locationModel.Inventory_Locations.inventory_location_id == inventory_location_id).first()
    if not inventory_loc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Inventory_Location with the id {inventory_location_id} is not available")
    return inventory_loc

# CREATE Inventory_Locations
@router.post('/')
def create_inventory_location(request: inventory_locationSchema.CreateInventoryLocation, db: Session = Depends(get_db)):
    to_store = inventory_locationModel.Inventory_Locations(
        inventory_location_name = request.inventory_location_name,
        supply_category_id = request.supply_category_id
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Inventory Location stored successfully.'}

# UPDATE Inventory_Locations
@router.put('/{inventory_location_id}')
def update_inventory_location(inventory_location_id: str, inventory_l: inventory_locationSchema.UpdateInventoryLocation, db: Session = Depends(get_db)): 
    if not db.query(inventory_locationModel.Inventory_Locations).filter(inventory_locationModel.Inventory_Locations.inventory_location_id == inventory_location_id).update({
        'inventory_location_name': inventory_l.inventory_location_name,
    }):
        raise HTTPException(404, 'Inventory_Location to update is not found')
    db.commit()
    return {'message': 'Inventory Location updated successfully.'}

# DELETE Inventory_Locations
@router.delete('/{inventory_location_id}')
def delete_inventory_location(inventory_location_id: str, db: Session = Depends(get_db)):
    if not db.query(inventory_locationModel.Inventory_Locations).filter(inventory_locationModel.Inventory_Locations.inventory_location_id == inventory_location_id).delete():
        raise HTTPException(404, 'Inventory_Location to delete is not found')
    db.commit()
    return {'message': 'Inventory Location removed successfully.'}

