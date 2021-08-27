from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.hospital_departmentModel import Hospital_Departments
from models.Admin.employeeModel import Employees

from models.Admin import hospital_departmentModel
from schemas.Admin import hospital_departmentSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/hospital_departments',
    tags=['hospital_department'],
    # dependencies=[Depends(get_token)]
)

#================================ Hospital Departments Table =================================#

# Hospital_Departments DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Hospital_Departments.hospital_department_id.like('%' + user_input + '%'),
                    Employees.employee_last_name.like('%' + user_input + '%'),
                    Hospital_Departments.hospital_department_name.like('%' + user_input + '%'),
                    Hospital_Departments.hospital_department_description.like('%' + user_input + '%'),
                    Hospital_Departments.created_at.like('%' + user_input + '%'),
                    Hospital_Departments.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Hospital_Departments, db.query(Hospital_Departments), 
        [
            'hospital_department_id',
            ('hospital_manager_id', 'manager.employee_last_name'),
            'hospital_department_name',
            'hospital_department_description',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all HD
@router.get('/')
def get_all_hospital_department(db: Session = Depends(get_db)):
    hd = db.query(hospital_departmentModel.Hospital_Departments).options(joinedload(hospital_departmentModel.Hospital_Departments.manager)).all()
    return {'Hospital_Departments': hd}

# GET one HD by ID
@router.get('/{hospital_department_id}', response_model=hospital_departmentSchema.ShowHospitalDepartment)
def get_one_hospital_department(hospital_department_id:str, db: Session = Depends(get_db)):
    hospital = db.query(hospital_departmentModel.Hospital_Departments).filter(hospital_departmentModel.Hospital_Departments.hospital_department_id == hospital_department_id).first()
    if not hospital:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Hospital Department with the id {hospital_department_id} is not available")
    return hospital

# CREATE HD
@router.post('/')
def create_hospital_department(request: hospital_departmentSchema.CreateHospitalDepartment, db: Session = Depends(get_db)):
    to_store = hospital_departmentModel.Hospital_Departments(
        hospital_manager_id = request.hospital_manager_id,
        hospital_department_name = request.hospital_department_name,
        hospital_department_description = request.hospital_department_description,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Hospital Department stored successfully.'}

# UPDATE HD
@router.put('/{hospital_department_id}')
def update_hospital_department(hospital_department_id: str, HD: hospital_departmentSchema.UpdateHospitalDepartment, db: Session = Depends(get_db)): 
    if not db.query(hospital_departmentModel.Hospital_Departments).filter(hospital_departmentModel.Hospital_Departments.hospital_department_id == hospital_department_id).update({
        'hospital_department_name': HD.hospital_department_name,
        'hospital_department_description': HD.hospital_department_description,
        
    }):
        raise HTTPException(404, 'Hospital Department to update is not found')
    db.commit()
    return {'message': 'Hospital Department updated successfully.'}

# DELETE HD
@router.delete('/{hospital_department_id}')
def delete_hospital_department(hospital_department_id: str, db: Session = Depends(get_db)):
    if not db.query(hospital_departmentModel.Hospital_Departments).filter(hospital_departmentModel.Hospital_Departments.hospital_department_id == hospital_department_id).delete():
        raise HTTPException(404, 'Hospital Department to delete is not found')
    db.commit()
    return {'message': 'Hospital Department removed successfully.'}

