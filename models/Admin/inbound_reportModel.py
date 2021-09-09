from sqlalchemy import Integer, String, DateTime, text, BigInteger, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.dialects import mysql

#--------------- Inbound_Reports Table ------------------#
class Inbound_Reports(Base):
#Table Name
    __tablename__ = 'inbound_reports'

#Columns
    inbound_report_id           = Column(String(36), primary_key=True, default=text('UUID()'))
    status                      = Column(String(255), nullable=False)
    # total_quantity              = Column(mysql.INTEGER(20), nullable=False)

    created_at                  = Column(DateTime, default=text('NOW()'))
    updated_at                  = Column(DateTime, onupdate=text('NOW()'))


    #Foreignkey
    request_id                  = Column(String(36), ForeignKey('request.request_id'), nullable=True)
    employee_id                 = Column(String(36), ForeignKey('employees.employee_id'), nullable=True)

#Relationship/s
    #Relationship/s of this Table
    requested = relationship('Request', back_populates='ir_requestFK')
    emp = relationship('Employees', back_populates='ir_employeeFK')






