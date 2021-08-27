from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import employeeSchema


#================================ Warehouses Table =================================#

class HospitalDepartmentBase(BaseModel):
    hospital_department_name: Optional[str]
    hospital_department_description: Optional[str]
    
    class Config():
        orm_mode = True
    
# Schema for request body
class CreateHospitalDepartment(HospitalDepartmentBase):
    hospital_manager_id: Optional[str]
    pass

class UpdateHospitalDepartment(BaseModel):
    hospital_department_name: Optional[str]
    hospital_department_description: Optional[str]


# Schema for response body
class ShowHospitalDepartment(HospitalDepartmentBase):
    hospital_department_id: str

    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None

    manager: Optional[employeeSchema.ShowEmployee]

    class Config():
        orm_mode = True

