from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import inventory_locationSchema
from schemas.Admin import supplySchema

#================================ Inventories Table =================================#
class InventoryBase(BaseModel):
    inventory_location_id: str
    supply_id: str

    class Config():
        orm_mode = True

# Schema for request body
class CreateInventory(InventoryBase):
    pass

class UpdateInventory(BaseModel):
    inventory_location_id: Optional[str]
    supply_id: Optional[str]

#Schema for response body
class ShowInventory(InventoryBase):
    inventory_id: Optional[str]
    
    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None

    inventory_location: Optional[inventory_locationSchema.ShowInventoryLocation]
    inventory_supply: Optional[supplySchema.ShowSupply]
    
    class Config():
        orm_mode = True