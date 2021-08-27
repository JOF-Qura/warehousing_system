from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable
from models.Admin import inventory_locationModel

# importing models one by one
from models.Admin.inventoryModel import Inventories
from models.Admin.inventory_locationModel import Inventory_Locations
from models.Admin.supplyModel import Supplies

from models.Admin import inventoryModel
from schemas.Admin import inventorySchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/inventories',
    tags=['inventory'],
    # dependencies=[Depends(get_token)]
)

#================================ Inventories Table =================================#

# Inventories DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Inventories.inventory_id.like('%' + user_input + '%'),
                    Inventory_Locations.inventory_location_name.like('%' + user_input + '%'),
                    Supplies.supply_name.like('%' + user_input + '%'),
                    Inventories.created_at.like('%' + user_input + '%'),
                    Inventories.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Inventories, db.query(Inventories), 
        [
            'inventory_id',
            ('inventory_location_id', 'inventory_location.inventory_location_name'),
            ('supply_id', 'inventory_supply.supply_name'),
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all Inventories
@router.get('/')
def get_all_inventory(db: Session = Depends(get_db)):
    inv = db.query(inventoryModel.Inventories).options(joinedload(inventoryModel.Inventories.inventory_location)
                                                            , joinedload(inventoryModel.Inventories.inventory_supply)).all()
    return {'Inventories': inv}

# GET Inventories by ID
@router.get('/{inventory_id}', response_model=inventorySchema.ShowInventory)
def get_one_inventory(inventory_id:str, db: Session = Depends(get_db)):
    inventory = db.query(inventoryModel.Inventories).filter(inventoryModel.Inventories.inventory_id == inventory_id).first()
    if not inventory:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Inventories with the id {inventory_id} is not available")
    return inventory

# CREATE Inventories
@router.post('/')
def create_inventory(request: inventorySchema.CreateInventory, db: Session = Depends(get_db)):
    to_store = inventoryModel.Inventories(
        inventory_location_id = request.inventory_location_id,
        supply_id = request.supply_id,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Inventory stored successfully.'}

# UPDATE Inventories
@router.put('/{inventory_id}')
def update_inventory(inventory_id: str, invent: inventorySchema.UpdateInventory, db: Session = Depends(get_db)): 
    if not db.query(inventoryModel.Inventories).filter(inventoryModel.Inventories.inventory_id == inventory_id).update({
        'inventory_location_id': invent.inventory_location_id,
        'supply_id': invent.supply_id,
    }):
        raise HTTPException(404, 'Inventories to update is not found')
    db.commit()
    return {'message': 'Inventory updated successfully.'}

# DELETE Inventories
@router.delete('/{inventory_id}')
def delete_inventory(inventory_id: str, db: Session = Depends(get_db)):
    if not db.query(inventoryModel.Inventories).filter(inventoryModel.Inventories.inventory_id == inventory_id).delete():
        raise HTTPException(404, 'Inventories to delete is not found')
    db.commit()
    return {'message': 'Inventory removed successfully.'}

