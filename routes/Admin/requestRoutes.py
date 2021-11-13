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
    prefix='/request',
    tags=['request'],
    # dependencies=[Depends(get_token)]
)

#================================ Request Table =================================#

# Request_M DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Request_M.request_id.like('%' + user_input + '%'),
                    Request_M.request_date.like('%' + user_input + '%'),
                    Request_M.requestor.like('%' + user_input + '%'),
                    Request_M.request_type.like('%' + user_input + '%'),
                    Request_M.request_status.like('%' + user_input + '%'),
                    Request_M.created_at.like('%' + user_input + '%'),
                    Request_M.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Request_M, db.query(Request_M).filter(Request_M.request_status != "OK"), 
        [
            'request_id',
            'request_date',
            'requestor',
            'request_type',
            'request_status',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all Request
@router.get('/')
def get_all_request(db: Session = Depends(get_db)):
    user = db.query(requestModel.Request).all()
    return {'Request': user}

# GET One request by ID
@router.get('/{request_id}')
def get_one_request(request_id:str,db: Session = Depends(get_db)):
    req = db.query(requestModel.Request).filter(requestModel.Request.request_id == request_id).first()
    if not req:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Request with the id {request_id} is not available")
    return req

# Create Request
@router.post('/')
def create_request(request: requestSchema.CreateRequest, db: Session = Depends(get_db)):
    to_store = requestModel.Request(
        request_date = request.request_date,
        requestor = request.requestor,
        request_type = request.request_type,
        request_status = request.request_status,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Request stored successfully.'}

# Update Request
@router.put('/{request_id}')
def update_request(request_id: str, r: requestSchema.UpdateRequest, db: Session = Depends(get_db)): 
    if not db.query(requestModel.Request).filter(requestModel.Request.request_id == request_id).update({
        'request_status': r.request_status,
        'requestor': r.requestor,
        'request_type': r.request_type,
    }):
        raise HTTPException(404, 'Request to update is not found')
    db.commit()
    return {'message': 'Request updated successfully.'}

# Delete Request
@router.delete('/{request_id}')
def delete_request(request_id: str, db: Session = Depends(get_db)):
    if not db.query(requestModel.Request).filter(requestModel.Request.request_id == request_id).delete():
        raise HTTPException(404, 'Request to delete is not found')
    db.commit()
    return {'message': 'Request removed successfully.'}

