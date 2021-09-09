from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.employeeModel import Employees
from models.Admin.userModel import Users

from models.Admin import employeeModel
from schemas.Admin import employeeSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/employees',
    tags=['employee'],
    # dependencies=[Depends(get_token)]
)

#================================ Employee Table =================================#

# Employees DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Employees.employee_id.like('%' + user_input + '%'),
                    Employees.user_id.like('%' + user_input + '%'),
                    Users.user_email.like('%' + user_input + '%'),
                    Employees.user_type.like('%' + user_input + '%'),
                    Employees.employee_first_name.like('%' + user_input + '%'),
                    Employees.employee_middle_name.like('%' + user_input + '%'),
                    Employees.employee_last_name.like('%' + user_input + '%'),
                    Employees.employee_age.like('%' + user_input + '%'),
                    Employees.employee_contact.like('%' + user_input + '%'),
                    Employees.employee_address.like('%' + user_input + '%'),
                    Employees.created_at.like('%' + user_input + '%'),
                    Employees.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Employees, db.query(Employees)
        , 
        [
            'employee_id',
            'user_id',
            # ('user_id', 'employee_user.user_email'),
            'user_type',
            'employee_first_name',
            'employee_middle_name',
            'employee_last_name',
            'employee_age',
            'employee_contact',
            'employee_address',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all Employee
@router.get('/')
def get_all_employee(db: Session = Depends(get_db)):
    emps = db.query(employeeModel.Employees).options(joinedload(employeeModel.Employees.employee_user)).all()
    return {'Employees': emps}

# GET Employee by ID
@router.get('/{employee_id}', response_model=employeeSchema.ShowEmployee)
def get_one_employee(employee_id:str, db: Session = Depends(get_db)):
    emp = db.query(employeeModel.Employees).filter(employeeModel.Employees.employee_id == employee_id).first()
    if not emp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Employee with the id {employee_id} is not available")
    return emp

# Create Employee
@router.post('/')
def create_employee(request: employeeSchema.CreateEmployee, db: Session = Depends(get_db)):
    to_store = employeeModel.Employees(
        user_id = request.user_id,
        user_type = request.user_type,
        employee_first_name = request.employee_first_name,
        employee_middle_name = request.employee_middle_name,
        employee_last_name = request.employee_last_name,
        employee_contact = request.employee_contact,
        employee_age = request.employee_age,
        employee_address = request.employee_address
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Employee stored successfully.'}

# Update Employee
@router.put('/{employee_id}')
def update_employee(employee_id: str, Employee: employeeSchema.UpdateEmployee, db: Session = Depends(get_db)): 
    if not db.query(employeeModel.Employees).filter(employeeModel.Employees.employee_id == employee_id).update({
        'user_type': Employee.user_type,
        'employee_first_name': Employee.employee_first_name,
        'employee_middle_name': Employee.employee_middle_name,
        'employee_last_name': Employee.employee_last_name,
        'employee_contact': Employee.employee_contact,
        'employee_age': Employee.employee_age,
        'employee_address': Employee.user_type,
    }):
        raise HTTPException(404, 'Employee to update is not found')
    db.commit()
    return {'message': 'Employee updated successfully.'}

# Delete Employee
@router.delete('/{employee_id}')
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    if not db.query(employeeModel.Employees).filter(employeeModel.Employees.employee_id == employee_id).delete():
        raise HTTPException(404, 'User to delete is not found')
    db.commit()
    return {'message': 'Employee removed successfully.'}

