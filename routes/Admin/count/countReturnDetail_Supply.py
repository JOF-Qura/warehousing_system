from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.returnModel import Return as Return_M
from models.Admin.return_detailModel import Return_Details
from models.Admin.supplyModel import Supplies

from models.Admin import return_detailModel
from schemas.Admin import return_detailSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/return_detail_count',
    tags=['return_detail'],
    dependencies=[Depends(get_token)]
)

#================================ Return Detail Table =================================#

# GET and COUNT return detail by return_id and supply
@router.get('/{return_id}/{supply_id}', response_model=List[return_detailSchema.ShowReturnDetail])
def count_response(return_id:str, supply_id:str, db: Session = Depends(get_db)):
    query = db.query(return_detailModel.Return_Details).filter(return_detailModel.Return_Details.return_id == return_id, return_detailModel.Return_Details.supply_id == supply_id).all()
    if not query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Return Detail with the return_id {return_id} and supply_id {supply_id} is not available")
    return query
