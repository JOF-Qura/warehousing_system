from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import employeeSchema

#================================ Warehouses Table =================================#
class WarehouseBase(BaseModel):
    warehouse_name: str
    warehouse_description: str
    warehouse_address: str
    warehouse_contact: str

    class Config():
        orm_mode = True

# Schema for request body
class CreateWarehouse(WarehouseBase):
    warehouse_manager_id: str
    pass

class UpdateWarehouse(BaseModel):
    warehouse_name: Optional[str]
    warehouse_description: Optional[str]
    warehouse_address: Optional[str]
    warehouse_contact: Optional[str]

#Schema for response body
class ShowWarehouse(WarehouseBase):
    warehouse_id: Optional[str]
    
    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None
    
    manager: Optional[employeeSchema.ShowEmployee]

    class Config():
        orm_mode = True