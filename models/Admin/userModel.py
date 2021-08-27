from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#-------------------- Users(System Users) Table ----------------------#
class Users(Base):
#Table Name
    __tablename__ = 'users'

#Columns
    user_id                 = Column(String(36), primary_key=True, default=text('UUID()'))
    user_email              = Column(String(255), nullable=False, unique=True)
    user_password           = Column(String(255), nullable=False)
    user_type               = Column(String(255), nullable=False)
    active_status           = Column(String(255), nullable=True, default='Active')
    
    created_at              = Column(DateTime, default=text('NOW()'))
    updated_at              = Column(DateTime, onupdate=text('NOW()'))
