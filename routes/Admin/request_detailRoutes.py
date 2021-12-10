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
    prefix='/request_detail',
    tags=['request_detail'],
    dependencies=[Depends(get_token)]
)

#================================ Request Detail Table =================================#

# GET request detail by request_id WHERE status == "Incomplete"
@router.get('/status/{request_id}', response_model=List[request_detailSchema.ShowRequestDetail])
def get_one_request_detail(request_id:str, db: Session = Depends(get_db)):
    emp = db.query(request_detailModel.Request_Details).filter(request_detailModel.Request_Details.request_id == request_id, request_detailModel.Request_Details.status == "Incomplete/Damaged").all()
    if not emp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Request Detail with the request_id {request_id} is not available")
    return emp

# Request_Details DataTable
@router.get('/datatable/{request_id}')
def datatable(request: Request, request_id: str, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Request_Details.request_details_id.like('%' + user_input + '%'),
                    Supplies.supply_name.like('%' + user_input + '%'),
                    Request_M.request_id.like('%' + user_input + '%'),
                    Request_Details.quantity.like('%' + user_input + '%'),
                    Request_Details.status.like('%' + user_input + '%'),
                    Request_Details.created_at.like('%' + user_input + '%'),
                    Request_Details.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Request_Details, db.query(Request_Details).filter(Request_Details.request_id == request_id), 
        [
            'request_details_id',
            ('request_id', 'request.request_id'),
            ('supply_id',  'supply.supply_name'),
            'quantity',
            'status',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET request detail by request_id
@router.get('/{request_details_id}/{request_id}', response_model=List[request_detailSchema.ShowRequestDetail])
def get_one_request_details_using_2param(request_details_id:str, request_id:str, db: Session = Depends(get_db)):
    query_get = db.query(request_detailModel.Request_Details).filter(request_detailModel.Request_Details.request_details_id == request_details_id, request_detailModel.Request_Details.request_id == request_id).all()
    if not query_get:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Request Detail with the request_details_id {request_details_id} and request_id {request_id} is not available")
    return query_get

# UPDATE Request Detail
@router.put('/{request_details_id}')
def update_request_detail(request_details_id: str, rd: request_detailSchema.UpdateRequestDetail, db: Session = Depends(get_db)): 
    if not db.query(request_detailModel.Request_Details).filter(request_detailModel.Request_Details.request_details_id == request_details_id).update({
        'quantity': rd.quantity,
        'status': rd.status,
        'request_id': rd.request_id,
        'supply_id': rd.supply_id,
    }):
        raise HTTPException(404, 'Request Detail to update is not found')
    db.commit()
    return {'message': 'Request Detail updated successfully.'}

# DELETE Request Detail
@router.delete('/{request_details_id}')
def delete_request_detail(request_details_id: str, db: Session = Depends(get_db)):
    if not db.query(request_detailModel.Request_Details).filter(request_detailModel.Request_Details.request_details_id == request_details_id).delete():
        raise HTTPException(404, 'Request Detail to delete is not found')
    db.commit()
    return {'message': 'Request Detail removed successfully.'}


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

# # GET request detail by request_id
# @router.get('/{request_id}/{supply_id}', response_model=List[request_detailSchema.ShowRequestDetail])
# def count_response(request_id:str, supply_id:str, db: Session = Depends(get_db)):
#     query = db.query(request_detailModel.Request_Details).filter(request_detailModel.Request_Details.request_id == request_id, request_detailModel.Request_Details.supply_id == supply_id).all()
#     if not query:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Request Detail with the request_id {request_id} is not available")
#     return query

# CREATE Request Detail
@router.post('/')
def create_request_detail(request: request_detailSchema.CreateRequestDetail, db: Session = Depends(get_db)):
    to_store = request_detailModel.Request_Details(
        request_id = request.request_id,
        supply_id = request.supply_id,
        quantity = request.quantity,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Request Detail stored successfully.'}



