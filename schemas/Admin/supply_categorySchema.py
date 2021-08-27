from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional


#================================ Supply Category Table =================================#

class SupplyCategoryBase(BaseModel):
    supply_category_name: Optional[str]
    supply_category_description: Optional[str]
    
    class Config():
        orm_mode = True
    
# Schema for request body
class CreateSupplyCategory(SupplyCategoryBase):
    pass

class UpdateSupplyCategory(BaseModel):
    supply_category_name: Optional[str]
    supply_category_description: Optional[str]


# Schema for response body
class ShowSupplyCategory(SupplyCategoryBase):
    supply_category_id: str

    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None
    
    class Config():
        orm_mode = True

