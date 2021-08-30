from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#-------------------- Warehouses Table ----------------------#
class Warehouses(Base):
#Table Name
    __tablename__ = 'warehouses'

#Columns
    warehouse_id                = Column(String(36), primary_key=True, default=text('UUID()'))
    warehouse_name              = Column(String(255), nullable=False)
    warehouse_description       = Column(Desc(255), nullable=False)
    warehouse_address           = Column(String(255), nullable=False)
    warehouse_contact           = Column(String(255), nullable=False, unique=True)

    created_at                  = Column(DateTime, default=text('NOW()'))
    updated_at                  = Column(DateTime, onupdate=text('NOW()'))
    
    #Foreignkey
    warehouse_manager_id        = Column(String(36), ForeignKey('employees.employee_id'), nullable=True, unique=True)

#Relationship/s
    #Relationship/s of this Table
    manager = relationship('Employees', back_populates='w_employeeFK')







