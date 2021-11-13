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
    prefix='/request_filter',
    tags=['request'],
    # dependencies=[Depends(get_token)]
)

#================================ Request Table =================================#

# GET All request by Requestor
@router.get('/datatable/filter_to_procurement')
def datatableProcurement(request: Request, db: Session = Depends(get_db)):
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

        table = DataTable(dict(request.query_params), Request_M, db.query(Request_M).filter(requestModel.Request.requestor == "Procurement"), 
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

# GET All request by Requestor
@router.get('/datatable/filter_to_hospital_department')
def datatableHD(request: Request, db: Session = Depends(get_db)):
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

        table = DataTable(dict(request.query_params), Request_M, db.query(Request_M).filter(requestModel.Request.requestor == "Hospital Department"), 
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

# GET All request by Requestor
@router.get('/datatable/filter_to_warehouse')
def datatableWarehouse(request: Request, db: Session = Depends(get_db)):
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

        table = DataTable(dict(request.query_params), Request_M, db.query(Request_M).filter(requestModel.Request.requestor == "Warehouse"), 
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

#=====================================================================================================================================#

# GET All request by Type
@router.get('/datatable/filter_to_for_request_type')
def datatableWarehouse(request: Request, db: Session = Depends(get_db)):
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

        table = DataTable(dict(request.query_params), Request_M, db.query(Request_M).filter(requestModel.Request.request_type == "For Request"), 
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


# GET All request by Requestor
# @router.get('/filter_to_warehouse')
# def get_all_procurement_request(db: Session = Depends(get_db)):
#     req = db.query(requestModel.Request).filter(requestModel.Request.requestor == "Warehouse").all()
#     if not req:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Request with procurement requestor is not available")
#     return req


# @router.get('/filter_to_hospital_department')
# def get_all_hd_request(db: Session = Depends(get_db)):
#     req = db.query(requestModel.Request).filter(requestModel.Request.requestor == "Hospital Department").all()
#     if not req:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Request with Hospital Department requestor is not available")
#     return req


# @router.get('/filter_to_warehouse')
# def get_all_warehouse_request(db: Session = Depends(get_db)):
#     req = db.query(requestModel.Request).filter(requestModel.Request.requestor == "Warehouse").all()
#     if not req:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Request with Warehouse requestor is not available")
#     return req

