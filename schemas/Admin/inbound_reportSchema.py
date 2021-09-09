from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import requestSchema
from schemas.Admin import employeeSchema

#================================ Inbound Report Table =================================#
class InboundReportBase(BaseModel):
    # total_quantity: str
    status: str

    class Config():
        orm_mode = True

# Schema for request body
class CreateInboundReport(InboundReportBase):
    employee_id: str
    request_id: str
    pass

class UpdateInboundReport(BaseModel):
    # total_quantity: Optional[str]
    status: Optional[str]

#Schema for response body
class ShowInboundReport(InboundReportBase):
    inbound_report_id: Optional[str]
    employee_id: Optional[str]
    request_id: Optional[str]
    
    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None

    requested: Optional[requestSchema.ShowRequest]
    emp: Optional[employeeSchema.ShowEmployee]
    
    class Config():
        orm_mode = True