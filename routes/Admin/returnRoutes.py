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
    prefix='/returns',
    tags=['returns'],
    # dependencies=[Depends(get_token)]
)

#================================ Return Table =================================#

# Return DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Returns.return_id.like('%' + user_input + '%'),
                    Returns.return_date.like('%' + user_input + '%'),
                    Returns.returner.like('%' + user_input + '%'),
                    Returns.return_type.like('%' + user_input + '%'),
                    Returns.return_status.like('%' + user_input + '%'),
                    Returns.created_at.like('%' + user_input + '%'),
                    Returns.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Returns, db.query(Returns), 
        [
            'return_id',
            'return_date',
            'returner',
            'return_type',
            'return_status',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all Return
@router.get('/')
def get_all_Return(db: Session = Depends(get_db)):
    ret = db.query(returnModel.Return).all()
    return {'Return': ret}

# GET One Return by ID
@router.get('/{return_id}')
def get_one_Return(return_id:str,db: Session = Depends(get_db)):
    req = db.query(returnModel.Return).filter(returnModel.Return.return_id == return_id).first()
    if not req:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Return with the id {return_id} is not available")
    return req

# Create Return
@router.post('/')
def create_Return(request: returnSchema.CreateReturn, db: Session = Depends(get_db)):
    to_store = returnModel.Return(
        return_date = request.return_date,
        returner = request.returner,
        return_type = request.return_type,
        return_status = request.return_status,
    )
    db.add(to_store)
    db.commit()
    ret = db.query(returnModel.Return).order_by(returnModel.Return.return_date.desc()).first()
    return {
                'message': 'Return stored successfully.',
                'return_date': request.return_date,
                'returner': request.returner,
                'return_type': request.return_type,
                'return_status': request.return_status,
                'return_id': ret.return_id
            }

# Update Return
@router.put('/{return_id}')
def update_request(return_id: str, r: returnSchema.UpdateReturn, db: Session = Depends(get_db)): 
    if not db.query(returnModel.Return).filter(returnModel.Return.return_id == return_id).update({
        'return_status': r.return_status,
        'returner': r.returner,
        # 'return_date': r.return_date,
        'return_type': r.return_type,
    }):
        raise HTTPException(404, 'Return to update is not found')
    db.commit()
    return {'message': 'Return updated successfully.'}

# Delete Return
@router.delete('/{return_id}')
def delete_Return(return_id: str, db: Session = Depends(get_db)):
    if not db.query(returnModel.Return).filter(returnModel.Return.return_id == return_id).delete():
        raise HTTPException(404, 'Return to delete is not found')
    db.commit()
    return {'message': 'Return removed successfully.'}

