from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import supply_categorySchema

#================================ Inventory Locations Table =================================#
class InventoryLocationBase(BaseModel):
    inventory_location_name: str

    class Config():
        orm_mode = True

# Schema for request body
class CreateInventoryLocation(InventoryLocationBase):
    supply_category_id: str
    pass

class UpdateInventoryLocation(BaseModel):
    inventory_location_name: Optional[str]

#Schema for response body
class ShowInventoryLocation(InventoryLocationBase):
    inventory_location_id: str
    supply_category_id: Optional[str]
    
    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None
    
    inventory_location_category: Optional[supply_categorySchema.ShowSupplyCategory]

    class Config():
        orm_mode = True