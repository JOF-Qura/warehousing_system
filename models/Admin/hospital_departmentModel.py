from sqlalchemy import Integer, String, DateTime, Text as Desc, text
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#-------------------- Hospital Table ----------------------#
class Hospital_Departments(Base):
#Table Name
    __tablename__ = 'hospital_departments'

#Columns
    hospital_department_id              = Column(String(36), primary_key=True, default=text('UUID()'))
    hospital_department_name            = Column(String(255), nullable=False)
    hospital_department_description     = Column(Desc(255), nullable=False)
    # hospital_manager                    = Column(String(255), nullable=False, default="Qura (Subject to Change)")

    created_at                          = Column(DateTime, default=text('NOW()'))
    updated_at                          = Column(DateTime, onupdate=text('NOW()'))


    #Foreignkey
    hospital_manager_id                 = Column(String(36), ForeignKey('employees.employee_id'), nullable=True, unique=True)

 #Relationship/s
     #Relationship/s of this Table
    manager = relationship('Employees', back_populates='hd_employeeFK')

    #Relationship/s of this Table to other Table/s
    or_hospital_departmentFK = relationship('Outbound_Reports', back_populates='hospital_department')







