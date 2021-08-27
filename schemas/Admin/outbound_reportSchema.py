from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import hospital_departmentSchema
from schemas.Admin import employeeSchema

#================================ Outbound Report Table =================================#
class OutboundReportBase(BaseModel):
    total_quantity: str
    status: str
    expected_shipment_date: dt
    complete_shipment_date: Optional[dt]

    class Config():
        orm_mode = True

# Schema for request body
class CreateOutboundReport(OutboundReportBase):
    employee_id: str
    hospital_department_id: str
    pass

class UpdateOutboundReport(BaseModel):
    total_quantity: Optional[str]
    status: Optional[str]

    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None
    
    expected_shipment_date: Optional[dt]
    complete_shipment_date: Optional[dt]

#Schema for response body
class ShowOutboundReport(OutboundReportBase):
    outbound_report_id: Optional[str]
    employee_id: Optional[str]
    hospital_department_id: Optional[str]
    hospital_department: Optional[hospital_departmentSchema.ShowHospitalDepartment]
    employee: Optional[employeeSchema.ShowEmployee]
    
    class Config():
        orm_mode = True