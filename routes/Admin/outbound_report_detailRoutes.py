from fastapi import APIRouter, Depends, HTTPException, Cookie, status
from models.Admin import outbound_report_detailModel
from schemas.Admin import outbound_report_detailSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/outbound_report_details',
    tags=['Outbound_Report_Detail'],
    dependencies=[Depends(get_token)]
)

#================================ Outbound Report Details Table =================================#

# GET all Outbound Report Details
@router.get('/')
def get_all_outbound_report_detail(db: Session = Depends(get_db)):
    out_rd = db.query(outbound_report_detailModel.Outbound_Report_Details).options(joinedload(outbound_report_detailModel.Outbound_Report_Details.outbound_report)
                                                                                , joinedload(outbound_report_detailModel.Outbound_Report_Details.inventory)).all()
    return {'Outbound_Report_Details': out_rd}

# GET Outbound Report Details by outbound_report ID
@router.get('/{outbound_report_id}', response_model=List[outbound_report_detailSchema.ShowOutboundReportDetail])
def get_one_outbound_report_detail(outbound_report_id:str, db: Session = Depends(get_db)):
    outbound_rd = db.query(outbound_report_detailModel.Outbound_Report_Details).filter(outbound_report_detailModel.Outbound_Report_Details.outbound_report_id == outbound_report_id).all()
    if not outbound_rd:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Outbound Report Details with the outbound_report_id {outbound_report_id} is not available")
    return outbound_rd

# CREATE Outbound Report Details
@router.post('/')
def create_outbound_report_detail(request: outbound_report_detailSchema.CreateOutboundReportDetail, db: Session = Depends(get_db)):
    to_store = outbound_report_detailModel.Outbound_Report_Details(
        outbound_report_id = request.outbound_report_id,
        inventory_id = request.inventory_id,
        status = request.status,
        quantity = request.quantity,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Outbound Report Detail stored successfully.'}

# UPDATE Outbound Report Details
@router.put('/{outbound_r_details_id}')
def update_outbound_report_detail(outbound_r_details_id: str, Outbound_rd: outbound_report_detailSchema.UpdateOutboundReportDetail, db: Session = Depends(get_db)): 
    if not db.query(outbound_report_detailModel.Outbound_Report_Details).filter(outbound_report_detailModel.Outbound_Report_Details.outbound_r_details_id == outbound_r_details_id).update({
        'quantity': Outbound_rd.quantity,
        'status': Outbound_rd.status,
    }):
        raise HTTPException(404, 'Outbound Report Details to update is not found')
    db.commit()
    return {'message': 'Outbound Report Detail updated successfully.'}

# DELETE Outbound Report Details
@router.delete('/{outbound_r_details_id}')
def delete_outbound_report_detail(outbound_r_details_id: str, db: Session = Depends(get_db)):
    if not db.query(outbound_report_detailModel.Outbound_Report_Details).filter(outbound_report_detailModel.Outbound_Report_Details.outbound_r_details_id == outbound_r_details_id).delete():
        raise HTTPException(404, 'Outbound Report Details to delete is not found')
    db.commit()
    return {'message': 'Outbound Report Detail removed successfully.'}

