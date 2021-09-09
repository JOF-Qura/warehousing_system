from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable

# importing models one by one
from models.Admin.inbound_reportModel import Inbound_Reports
from models.Admin.employeeModel import Employees

from models.Admin import inbound_reportModel
from schemas.Admin import inbound_reportSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/inbound_reports',
    tags=['inbound_report'],
    # dependencies=[Depends(get_token)]
)

#================================ Inbound Reports Table =================================#

# Inbound_Reports DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Inbound_Reports.inbound_report_id.like('%' + user_input + '%'),
                    Inbound_Reports.request_id.like('%' + user_input + '%'),
                    Employees.employee_last_name.like('%' + user_input + '%'),
                    Inbound_Reports.status.like('%' + user_input + '%'),
                    # Inbound_Reports.total_quantity.like('%' + user_input + '%'),
                    Inbound_Reports.created_at.like('%' + user_input + '%'),
                    Inbound_Reports.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Inbound_Reports, db.query(Inbound_Reports), 
        [
            'inbound_report_id',
            'request_id',
            ('employee_id', 'emp.employee_last_name'),
            'status',
            # 'total_quantity',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all Inbound Reports
@router.get('/')
def get_all_inbound_report(db: Session = Depends(get_db)):
    ir = db.query(inbound_reportModel.Inbound_Reports).options(joinedload(inbound_reportModel.Inbound_Reports.requested)
                                                                , joinedload(inbound_reportModel.Inbound_Reports.emp)).all()
    return {'Inbound_Reports': ir}

# GET Inbound Reports by ID
@router.get('/{inbound_report_id}', response_model=inbound_reportSchema.ShowInboundReport)
def get_one_inbound_report(inbound_report_id:str, db: Session = Depends(get_db)):
    inbound = db.query(inbound_reportModel.Inbound_Reports).filter(inbound_reportModel.Inbound_Reports.inbound_report_id == inbound_report_id).first()
    if not inbound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Inbound Report with the id {inbound_report_id} is not available")
    return inbound

# CREATE Inbound Reports
@router.post('/')
def create_inbound_report(request: inbound_reportSchema.CreateInboundReport, db: Session = Depends(get_db)):
    to_store = inbound_reportModel.Inbound_Reports(
        request_id = request.request_id,
        employee_id = request.employee_id,
        status = request.status,
        # total_quantity = request.total_quantity,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Inbound Report stored successfully.'}

# UPDATE Inbound Reports
@router.put('/{inbound_report_id}')
def update_inbound_report(inbound_report_id: str, Inbound_r: inbound_reportSchema.UpdateInboundReport, db: Session = Depends(get_db)): 
    if not db.query(inbound_reportModel.Inbound_Reports).filter(inbound_reportModel.Inbound_Reports.inbound_report_id == inbound_report_id).update({
        # 'total_quantity': Inbound_r.total_quantity,
        'status': Inbound_r.status,
    }):
        raise HTTPException(404, 'Inbound Report to update is not found')
    db.commit()
    return {'message': 'Inbound Reports updated successfully.'}

# DELETE Inbound Reports
@router.delete('/{inbound_report_id}')
def delete_inbound_report(inbound_report_id: str, db: Session = Depends(get_db)):
    if not db.query(inbound_reportModel.Inbound_Reports).filter(inbound_reportModel.Inbound_Reports.inbound_report_id == inbound_report_id).delete():
        raise HTTPException(404, 'Inbound Report to delete is not found')
    db.commit()
    return {'message': 'Inbound Report removed successfully.'}

