from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from database import get_db
from models.Admin.userModel import Users
from schemas.Admin.authSchema import TokenData, AuthForm
from schemas.Admin.userSchema import CreateUser
from jose import jwt
from passlib.context import CryptContext

secret = 'a very shady secret'
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def password_verify(plain, hashed):
    return pwd_context.verify(plain, hashed)

def password_hash(password):
    return pwd_context.hash(password)

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@router.post('/register')
def register(request: CreateUser, db: Session = Depends(get_db)):
    try:
        request.user_password = password_hash(request.user_password)
        user = Users(        
            user_type = request.user_type, 
            user_email = request.user_email,
            user_password = request.user_password,
        )
        db.add(user)
        db.commit()
        return {'message': 'Registered Successfully!'}
    except Exception as e:
        print(e)

@router.post('/verify')
def verify(form: AuthForm, response: Response, db: Session = Depends(get_db)):
    try:
        user = db.query(Users).filter(Users.user_email == form.user_email).first()
        if not user:
            return 404
        elif user:
            match = password_verify(form.user_password, user.user_password)
            if not match:
                return 4041
            elif match:
                data = TokenData(user_id = user.user_id, user_type = user.user_type, user_email = user.user_email, user_password = user.user_password)
                token = jwt.encode(dict(data), secret)
                response.set_cookie('token', token, httponly=True)
                return {'message': 'Log In Success!', 'data': data, 'token': token}
        
        return {'message': 'User not found.'}
    except Exception as e:
        print(e)

@router.post('/logout')
def logout(response: Response):
    response.delete_cookie('token')
    return {'message': 'Logout Success!'}