from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional


#================================ Suppliers Table =================================#

class SupplierBase(BaseModel):
    supplier_name: Optional[str] = None
    supplier_contact: Optional[int] = None
    supplier_email: Optional[str] = None
    supplier_description: Optional[str] = None
    
    class Config():
        orm_mode = True
    
# Schema for request body
class CreateSupplier(SupplierBase):
    pass

class UpdateSupplier(BaseModel):
    supplier_name: Optional[str] = None
    supplier_contact: Optional[int] = None
    supplier_email: Optional[str] = None
    supplier_description: Optional[str] = None


# Schema for response body
class ShowSupplier(SupplierBase):
    supplier_id: str

    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None
    
    class Config():
        orm_mode = True

