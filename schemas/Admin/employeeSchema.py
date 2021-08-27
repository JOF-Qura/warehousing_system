from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import userSchema

#================================ Employees Table =================================#
class EmployeeBase(BaseModel):
    employee_first_name: str
    employee_middle_name: str
    employee_last_name: str
    employee_contact: int
    employee_age: int
    employee_address: str
    user_type: str

    class Config():
        orm_mode = True

# Schema for request body
class CreateEmployee(EmployeeBase):
    user_id: Optional[str] = None
    pass

class UpdateEmployee(BaseModel):
    employee_first_name: Optional[str]
    employee_middle_name: Optional[str]
    employee_last_name: Optional[str]
    employee_contact: Optional[int]
    employee_age: Optional[int]
    employee_address: Optional[str]
    user_type: Optional[str]

#Schema for response body
class ShowEmployee(EmployeeBase):
    employee_id: str
    user_id: Optional[str]
    
    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None
    
    employee_user: Optional[userSchema.ShowUser]
    
    class Config():
        orm_mode = True