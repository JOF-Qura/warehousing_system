from fastapi import APIRouter, Depends, HTTPException, Cookie, status
from models.Admin import request_detailModel
from schemas.Admin import request_detailSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/request_detail',
    tags=['request_detail'],
    dependencies=[Depends(get_token)]
)

#================================ Request Detail Table =================================#

# GET all request detail
@router.get('/')
def get_all_request_detail(db: Session = Depends(get_db)):
    rd = db.query(request_detailModel.Request_Details).options(joinedload(request_detailModel.Request_Details.request)
                                                                , joinedload(request_detailModel.Request_Details.supply)).all()
    return {'Request_Details': rd}

# GET request detail by request_id
@router.get('/{request_id}', response_model=List[request_detailSchema.ShowRequestDetail])
def get_one_request_detail(request_id:str, db: Session = Depends(get_db)):
    emp = db.query(request_detailModel.Request_Details).filter(request_detailModel.Request_Details.request_id == request_id).all()
    if not emp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Request Detail with the request_id {request_id} is not available")
    return emp

# CREATE Request Detail
@router.post('/')
def create_request_detail(request: request_detailSchema.CreateRequestDetail, db: Session = Depends(get_db)):
    to_store = request_detailModel.Request_Details(
        request_id = request.request_id,
        supply_id = request.supply_id,
        quantity = request.quantity,
        status = request.status,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Request Detail stored successfully.'}

# UPDATE Request Detail
@router.put('/{request_detail_id}')
def update_request_detail(request_detail_id: str, rd: request_detailSchema.UpdateRequestDetail, db: Session = Depends(get_db)): 
    if not db.query(request_detailModel.Request_Details).filter(request_detailModel.Request_Details.request_detail_id == request_detail_id).update({
        'quantity': rd.quantity,
        'status': rd.status,
    }):
        raise HTTPException(404, 'Request Detail to update is not found')
    db.commit()
    return {'message': 'Request Detail updated successfully.'}

# DELETE Request Detail
@router.delete('/{request_detail_id}')
def delete_request_detail(request_detail_id: str, db: Session = Depends(get_db)):
    if not db.query(request_detailModel.Request_Details).filter(request_detailModel.Request_Details.request_detail_id == request_detail_id).delete():
        raise HTTPException(404, 'Request Detail to delete is not found')
    db.commit()
    return {'message': 'Request Detail removed successfully.'}

