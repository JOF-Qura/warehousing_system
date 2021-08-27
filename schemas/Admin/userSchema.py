from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional


#================================ User Table =================================#

class UserBase(BaseModel):
    user_type: Optional[str]
    user_email: Optional[str]
    user_password: Optional[str]
    
    class Config:
        orm_mode = True
    
# Schema for request body
class CreateUser(UserBase):
    pass

class UpdateUser(BaseModel):
    user_type: Optional[str]
    user_email: Optional[str]
    user_password: Optional[str]
    active_status: Optional[str]


# Schema for response body
class ShowUser(UserBase):
    user_id: str
    
    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None

    class Config():
        orm_mode = True

