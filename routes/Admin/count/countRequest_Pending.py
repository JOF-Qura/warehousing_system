from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.requestModel import Request as Request_M

from models.Admin import requestModel
from schemas.Admin import requestSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/request_count',
    tags=['request'],
    # dependencies=[Depends(get_token)]
)

#================================ Request Table =================================#

@router.get('/', response_model=List[requestSchema.ShowRequest])
def count_response(db: Session = Depends(get_db)):
    query = db.query(requestModel.Request).filter(requestModel.Request.request_status == "Pending").all()
    if not query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"No Pending Request")
    return query

