from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.returnModel import Return as Returns

from models.Admin import returnModel
from schemas.Admin import returnSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/returns_count',
    tags=['returns'],
    # dependencies=[Depends(get_token)]
)

#================================ Return Table =================================#

@router.get('/', response_model=List[returnSchema.ShowReturn])
def count_response(db: Session = Depends(get_db)):
    query = db.query(returnModel.Return).filter(returnModel.Return.return_status == "Pending").all()
    if not query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"No Pending Return")
    return query