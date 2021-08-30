from pydantic import BaseModel

class TokenData(BaseModel):
    user_id: str
    user_type: str
    user_email: str
    user_password: str


class AuthForm(BaseModel):
    user_email: str
    user_password: str
