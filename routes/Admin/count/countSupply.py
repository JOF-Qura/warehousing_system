from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.supplyModel import Supplies
from models.Admin.supply_categoryModel import Supply_Categories
from models.Admin.supplierModel import Suppliers

from models.Admin import supplyModel
from schemas.Admin import supplySchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/supplies_count',
    tags=['supply'],
    # dependencies=[Depends(get_token)]
)

#================================ Supply Table =================================#

# GET all Supplies < 100
@router.get('/', response_model=List[supplySchema.ShowSupply])
def count_response(db: Session = Depends(get_db)):
    query = db.query(supplyModel.Supplies).filter(supplyModel.Supplies.supply_quantity < 100).all()
    if not query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"No Supply Less than 100")
    return query
