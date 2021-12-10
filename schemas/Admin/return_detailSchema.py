from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import returnSchema
from schemas.Admin import supplySchema

#================================ Return Details Table =================================#
class ReturnDetailBase(BaseModel):
    quantity: Optional[int] = None
    status: Optional[str] = None

    class Config():
        orm_mode = True

# Schema for return body
class CreateReturnDetail(ReturnDetailBase):
    supply_id: str
    return_id: str
    pass

class UpdateReturnDetail(BaseModel):
    quantity: Optional[int]
    status: Optional[str]
    return_id: Optional[str] = None
    supply_id: Optional[str] = None

#Schema for response body
class ShowReturnDetail(ReturnDetailBase):
    return_detail_id: Optional[str]
    return_id: Optional[str]
    supply_id: Optional[str]

    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None
    
    returns: Optional[returnSchema.ShowReturn]
    return_supply: Optional[supplySchema.ShowSupply]
    
    class Config():
        orm_mode = True