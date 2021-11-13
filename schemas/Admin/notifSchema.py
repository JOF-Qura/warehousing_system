from datetime import datetime as dt
from pydantic import BaseModel
from typing import List, Optional
from schemas.Admin import supplySchema

#================================ Inventories Table =================================#
class NoticationBase(BaseModel):
    supply_id: Optional[str]
    request_id: Optional[str]
    return_id: Optional[str]
    description: str
    status: str
    

    class Config():
        orm_mode = True

# Schema for request body
class CreateNotification(NoticationBase):
    pass

class UpdateNotification(BaseModel):
    status: Optional[str]

#Schema for response body
class ShowNotification(NoticationBase):
    notification_id: Optional[str]
    description: Optional[str]
    status: Optional[str]
    
    created_at: Optional[dt] = None
    updated_at: Optional[dt] = None

    supply_notif: Optional[supplySchema.ShowSupply]
    
    class Config():
        orm_mode = True