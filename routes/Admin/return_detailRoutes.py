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
    prefix='/return_detail',
    tags=['return_detail'],
    dependencies=[Depends(get_token)]
)

#================================ Return Detail Table =================================#

# Return_Details DataTable
@router.get('/datatable/{return_id}')
def datatable(request: Request, return_id: str, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Return_Details.return_detail_id.like('%' + user_input + '%'),
                    Supplies.supply_name.like('%' + user_input + '%'),
                    Return_M.return_id.like('%' + user_input + '%'),
                    Return_Details.quantity.like('%' + user_input + '%'),
                    Return_Details.status.like('%' + user_input + '%'),
                    Return_Details.created_at.like('%' + user_input + '%'),
                    Return_Details.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Return_Details, db.query(Return_Details).filter(Return_Details.return_id == return_id), 
        [
            'return_detail_id',
            ('return_id', 'returns.return_id'),
            ('supply_id',  'return_supply.supply_name'),
            'quantity',
            'status',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET return detail by return_id
@router.get('/{return_detail_id}/{return_id}', response_model=List[return_detailSchema.ShowReturnDetail])
def get_one_return_details_using_2param(return_detail_id:str, return_id:str, db: Session = Depends(get_db)):
    query_get = db.query(return_detailModel.Return_Details).filter(return_detailModel.Return_Details.return_detail_id == return_detail_id, return_detailModel.Return_Details.return_id == return_id).all()
    if not query_get:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Return Detail with the return_detail_id {return_detail_id} and return_id {return_id} is not available")
    return query_get

# UPDATE Return Detail
@router.put('/{return_detail_id}')
def update_request_detail(return_detail_id: str, rd: return_detailSchema.UpdateReturnDetail, db: Session = Depends(get_db)): 
    if not db.query(return_detailModel.Return_Details).filter(return_detailModel.Return_Details.return_detail_id == return_detail_id).update({
        'quantity': rd.quantity,
        'status': rd.status,
        'return_id': rd.return_id,
        'supply_id': rd.supply_id,
    }):
        raise HTTPException(404, 'Return Detail to update is not found')
    db.commit()
    return {'message': 'Return Detail updated successfully.'}

# DELETE Return Detail
@router.delete('/{return_detail_id}')
def delete_return_detail(return_detail_id: str, db: Session = Depends(get_db)):
    if not db.query(return_detailModel.Return_Details).filter(return_detailModel.Return_Details.return_detail_id == return_detail_id).delete():
        raise HTTPException(404, 'Return Detail to delete is not found')
    db.commit()
    return {'message': 'Return Detail removed successfully.'}


# GET all return detail
@router.get('/')
def get_all_return_detail(db: Session = Depends(get_db)):
    rd = db.query(return_detailModel.Return_Details).options(joinedload(return_detailModel.Return_Details.returns)
                                                                , joinedload(return_detailModel.Return_Details.return_supply)).all()
    return {'Return_Details': rd}

# GET return detail by return_id
@router.get('/{return_id}', response_model=List[return_detailSchema.ShowReturnDetail])
def get_one_return_detail(return_id:str, db: Session = Depends(get_db)):
    emp = db.query(return_detailModel.Return_Details).filter(return_detailModel.Return_Details.return_id == return_id).all()
    if not emp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Return Detail with the return_id {return_id} is not available")
    return emp

# # GET return detail by return_id
# @router.get('/{return_id}/{supply_id}', response_model=List[return_detailSchema.ShowReturnDetail])
# def count_response(return_id:str, supply_id:str, db: Session = Depends(get_db)):
#     query = db.query(return_detailModel.Return_Details).filter(return_detailModel.Return_Details.return_id == return_id, return_detailModel.Return_Details.supply_id == supply_id).all()
#     if not query:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Return Detail with the return_id {return_id} is not available")
#     return query

# CREATE Return Detail
@router.post('/')
def create_return_detail(ret: return_detailSchema.CreateReturnDetail, db: Session = Depends(get_db)):
    to_store = return_detailModel.Return_Details(
        return_id = ret.return_id,
        supply_id = ret.supply_id,
        quantity = ret.quantity,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Return Detail stored successfully.'}



