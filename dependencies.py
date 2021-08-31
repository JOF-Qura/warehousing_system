from fastapi import Cookie, HTTPException, FastAPI, Request, Depends
from fastapi.responses import HTMLResponse
from jose import jwt, JWTError
from fastapi.templating import Jinja2Templates

secret = 'a very shady secret'

def get_token(token: str = Cookie('token')):
    try:
        user_email = jwt.decode(token, secret)
        if user_email:
            return user_email
    except JWTError:
        return HTTPException(401, 'Please Log In first')