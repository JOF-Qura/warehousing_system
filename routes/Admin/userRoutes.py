from fastapi import APIRouter,  Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_

# importing models one by one
from models.Admin.userModel import Users

from models.Admin import userModel
from schemas.Admin import userSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from passlib.context import CryptContext
from datatables import DataTable

# Hashing Password
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def password_hash(password):
    return pwd_context.hash(password)
# //Hashing Password

router = APIRouter(
    prefix='/users',
    tags=['users'],
    # dependencies=[Depends(get_token)]
)

#================================ User Table =================================#

# Users DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Users.user_id.like('%' + user_input + '%'),
                    Users.user_email.like('%' + user_input + '%'),
                    Users.user_password.like('%' + user_input + '%'),
                    Users.user_type.like('%' + user_input + '%'),
                    Users.created_at.like('%' + user_input + '%'),
                    Users.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Users, db.query(Users), 
        [
            ('user_id'),
            'user_email',
            'user_password',
            'user_type',
            'active_status',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)


# Get All User
@router.get('/')
def get_all_user(db: Session = Depends(get_db)):
    user = db.query(userModel.Users).all()
    return {'Users': user}

# Get One User by ID
@router.get('/{user_id}')
def get_one_user(user_id:str,db: Session = Depends(get_db)):
    emp = db.query(userModel.Users).filter(userModel.Users.user_id == user_id).first()
    if not emp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {user_id} is not available")
    return emp

# Create User
@router.post('/')
def create_user(request: userSchema.CreateUser, db: Session = Depends(get_db)):
    request.user_password = password_hash(request.user_password)
    to_store = userModel.Users(
        user_email = request.user_email,
        user_password = request.user_password,
        user_type = request.user_type,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'User stored successfully.'}

# Update User
@router.put('/{user_id}')
def update_user(user_id: str, User: userSchema.UpdateUser, db: Session = Depends(get_db)): 
    if not db.query(userModel.Users).filter(userModel.Users.user_id == user_id).update(
    {
        'user_type': User.user_type,
        'user_email': User.user_email,
        'active_status': User.active_status,
    }):
        raise HTTPException(404, 'User to update is not found')
    db.commit()
    return {'message': 'User updated successfully.'}

# Delete User
@router.delete('/{user_id}')
def delete_user(user_id: str, db: Session = Depends(get_db)):
    if not db.query(userModel.Users).filter(userModel.Users.user_id == user_id).delete():
        raise HTTPException(404, 'User to delete is not found')
    db.commit()
    return {'message': 'User removed successfully.'}

