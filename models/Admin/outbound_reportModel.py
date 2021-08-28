from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.dialects import mysql

#--------------- Outbound_Reports Table ------------------#
class Outbound_Reports(Base):
#Table Name
    __tablename__ = 'outbound_reports'

#Columns
    outbound_report_id          = Column(String(36), primary_key=True, default=text('UUID()'))
    status                      = Column(String(255), nullable=False)
    total_quantity              = Column(mysql.INTEGER(20), nullable=False)
    expected_shipment_date      = Column(DateTime(255), nullable=False)
    complete_shipment_date      = Column(DateTime(255), nullable=True)

    created_at                  = Column(DateTime, default=text('NOW()'))
    updated_at                  = Column(DateTime, onupdate=text('NOW()'))

    #Foreignkey
    hospital_department_id      = Column(String(36), ForeignKey('hospital_departments.hospital_department_id'), nullable=True)
    employee_id                 = Column(String(36), ForeignKey('employees.employee_id'), nullable=True)

#Relationship/s
    #Relationship/s of this Table
    hospital_department = relationship('Hospital_Departments', back_populates='or_hospital_departmentFK')
    employee = relationship('Employees', back_populates='or_employeeFK')

    #Relationship/s of this Table to other Table/s
    ord_outbound_reportFK = relationship("Outbound_Report_Details", back_populates="outbound_report")






