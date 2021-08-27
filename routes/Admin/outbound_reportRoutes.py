from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.outbound_reportModel import Outbound_Reports
from models.Admin.hospital_departmentModel import Hospital_Departments
from models.Admin.employeeModel import Employees

from models.Admin import outbound_reportModel
from schemas.Admin import outbound_reportSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/outbound_reports',
    tags=['outbound_report'],
    # dependencies=[Depends(get_token)]
)

#================================ Outbound Report Table =================================#

# Outbound_Reports DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Outbound_Reports.outbound_report_id.like('%' + user_input + '%'),
                    Hospital_Departments.hospital_department_name.like('%' + user_input + '%'),
                    Employees.employee_last_name.like('%' + user_input + '%'),
                    Outbound_Reports.status.like('%' + user_input + '%'),
                    Outbound_Reports.total_quantity.like('%' + user_input + '%'),
                    Outbound_Reports.expected_shipment_date.like('%' + user_input + '%'),
                    Outbound_Reports.complete_shipment_date.like('%' + user_input + '%'),
                    Outbound_Reports.created_at.like('%' + user_input + '%'),
                    Outbound_Reports.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Outbound_Reports, db.query(Outbound_Reports), 
        [
            'outbound_report_id',
            ('hospital_department_id', 'hospital_department.hospital_department_name'),
            ('employee_id', 'employee.employee_last_name'),
            'status',
            'total_quantity',
            'expected_shipment_date',
            'complete_shipment_date',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all Outbound Report
@router.get('/')
def get_all_outbound_report(db: Session = Depends(get_db)):
    out = db.query(outbound_reportModel.Outbound_Reports).options(joinedload(outbound_reportModel.Outbound_Reports.hospital_department)
                                                                , joinedload(outbound_reportModel.Outbound_Reports.employee)).all()
    return {'outbound_Reports': out}

# GET Outbound Report by ID
@router.get('/{outbound_report_id}', response_model=outbound_reportSchema.ShowOutboundReport)
def get_one_outbound_report(outbound_report_id:str, db: Session = Depends(get_db)):
    outbound = db.query(outbound_reportModel.Outbound_Reports).filter(outbound_reportModel.Outbound_Reports.outbound_report_id == outbound_report_id).first()
    if not outbound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Outbound Report with the id {outbound_report_id} is not available")
    return outbound

# CREATE Outbound Report
@router.post('/')
def create_outbound_report(request: outbound_reportSchema.CreateOutboundReport, db: Session = Depends(get_db)):
    to_store = outbound_reportModel.Outbound_Reports(
        hospital_department_id = request.hospital_department_id,
        employee_id = request.employee_id,
        status = request.status,
        total_quantity = request.total_quantity,
        expected_shipment_date = request.expected_shipment_date,
        complete_shipment_date = request.complete_shipment_date,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Outbound Report stored successfully.'}

# UPDATE Outbound Report
@router.put('/{outbound_report_id}')
def update_outbound_report(outbound_report_id: str, Outbound_r: outbound_reportSchema.UpdateOutboundReport, db: Session = Depends(get_db)): 
    if not db.query(outbound_reportModel.Outbound_Reports).filter(outbound_reportModel.Outbound_Reports.outbound_report_id == outbound_report_id).update({
        'total_quantity': Outbound_r.total_quantity,
        'status': Outbound_r.status,
        'expected_shipment_date': Outbound_r.expected_shipment_date,
        'complete_shipment_date': Outbound_r.complete_shipment_date,
    }):
        raise HTTPException(404, 'Outbound Report to update is not found')
    db.commit()
    return {'message': 'Outbound Report updated successfully.'}

# DELETE Outbound Report
@router.delete('/{outbound_report_id}')
def delete_outbound_report(outbound_report_id: str, db: Session = Depends(get_db)):
    if not db.query(outbound_reportModel.Outbound_Reports).filter(outbound_reportModel.Outbound_Reports.outbound_report_id == outbound_report_id).delete():
        raise HTTPException(404, 'Outbound Report to delete is not found')
    db.commit()
    return {'message': 'Outbound Report removed successfully.'}

