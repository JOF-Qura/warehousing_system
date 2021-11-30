from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import requestSchema
from schemas.Admin import supplySchema

#================================ Request Details Table =================================#
class RequestDetailBase(BaseModel):
    quantity: Optional[int] = None
    status: Optional[str] = None

    class Config():
        orm_mode = True

# Schema for request body
class CreateRequestDetail(RequestDetailBase):
    supply_id: str
    request_id: str
    pass

class UpdateRequestDetail(BaseModel):
    quantity: Optional[int] = None
    status: Optional[str] = None
    request_id: Optional[str] = None
    supply_id: Optional[str] = None

#Schema for response body
class ShowRequestDetail(RequestDetailBase):
    request_details_id: Optional[str]
    request_id: Optional[str]
    supply_id: Optional[str]

    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None
    
    request: Optional[requestSchema.ShowRequest]
    supply: Optional[supplySchema.ShowSupply]
    
    class Config():
        orm_mode = True