from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional


#================================ Return Table =================================#

class ReturnBase(BaseModel):
    return_id: Optional[str]
    return_date: Optional[dt]
    returner: Optional[str]
    return_type: Optional[str]
    return_status: Optional[str]
    
    class Config:
        orm_mode = True
    
# Schema for Return body
class CreateReturn(ReturnBase):
    pass

class UpdateReturn(BaseModel):
    # return_date: Optional[dt]
    returner: Optional[str]
    return_type: Optional[str]
    return_status: Optional[str]


# Schema for response body
class ShowReturn(ReturnBase):
    return_id: str

    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None

    class Config():
        orm_mode = True

