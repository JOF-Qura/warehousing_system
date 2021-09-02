from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional


#================================ Request Table =================================#

class RequestBase(BaseModel):
    request_date: Optional[dt]
    requestor: Optional[str]
    request_type: Optional[str]
    request_status: Optional[str]
    
    class Config:
        orm_mode = True
    
# Schema for request body
class CreateRequest(RequestBase):
    pass

class UpdateRequest(BaseModel):
    requestor: Optional[str]
    request_type: Optional[str]
    request_status: Optional[str]


# Schema for response body
class ShowRequest(RequestBase):
    request_id: str

    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None

    class Config():
        orm_mode = True

