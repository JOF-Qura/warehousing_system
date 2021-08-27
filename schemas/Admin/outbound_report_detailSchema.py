from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import outbound_reportSchema
from schemas.Admin import inventorySchema

#================================ Outbound Report Details Table =================================#
class OutboundReportDetailBase(BaseModel):
    quantity: str
    status: str

    class Config():
        orm_mode = True

# Schema for request body
class CreateOutboundReportDetail(OutboundReportDetailBase):
    outbound_report_id: str
    inventory_id: str
    pass

class UpdateOutboundReportDetail(BaseModel):
    quantity: Optional[str]
    status: Optional[str]

#Schema for response body
class ShowOutboundReportDetail(OutboundReportDetailBase):
    outbound_r_details_id: Optional[str]
    outbound_report_id: Optional[str]
    inventory_id: Optional[str]

    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None
    
    outbound_report: Optional[outbound_reportSchema.ShowOutboundReport]
    inventory: Optional[inventorySchema.ShowInventory]
    
    class Config():
        orm_mode = True