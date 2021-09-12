from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.requestModel import Request as Request_M
from models.Admin.request_detailModel import Request_Details
from models.Admin.supplyModel import Supplies

from models.Admin import request_detailModel
from schemas.Admin import request_detailSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/request_detail_count',
    tags=['request_detail'],
    dependencies=[Depends(get_token)]
)

#================================ Request Detail Table =================================#

# GET and COUNT request detail by request_id and supply
@router.get('/{request_id}/{supply_id}', response_model=List[request_detailSchema.ShowRequestDetail])
def count_response(request_id:str, supply_id:str, db: Session = Depends(get_db)):
    query = db.query(request_detailModel.Request_Details).filter(request_detailModel.Request_Details.request_id == request_id, request_detailModel.Request_Details.supply_id == supply_id).all()
    if not query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Request Detail with the request_id {request_id} and supply_id {supply_id} is not available")
    return query
