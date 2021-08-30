from sqlalchemy import Integer, String, DateTime, Text as Desc, text
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#-------------------- Employees Table ----------------------#
class Employees(Base):
#Table Name
    __tablename__ = 'employees'

#Columns
    employee_id             = Column(String(36), primary_key=True, default=text('UUID()'))
    user_type               = Column(String(255), nullable=False)
    employee_first_name     = Column(String(255), nullable=False)
    employee_middle_name    = Column(String(255), nullable=True)
    employee_last_name      = Column(String(255), nullable=False)
    employee_contact        = Column(String(255), nullable=False, unique=True)
    employee_age            = Column(Integer, nullable=False)
    employee_address        = Column(String(255), nullable=False)

    created_at              = Column(DateTime, default=text('NOW()'))
    updated_at              = Column(DateTime, onupdate=text('NOW()'))


    #Foreignkey
    user_id                 = Column(String(36), ForeignKey('users.user_id'), nullable=True, unique=True)
    
#Relationship/s
    #Relationship/s of this Table
    employee_user = relationship('Users', backref='user_employeeFK')

    #Relationship/s of this Table to other Table/s
    or_employeeFK = relationship("Outbound_Reports", back_populates="employee")
    ir_employeeFK = relationship("Inbound_Reports", back_populates="emp")
    w_employeeFK = relationship("Warehouses", back_populates="manager")
    hd_employeeFK = relationship("Hospital_Departments", back_populates="manager")
