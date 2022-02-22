from datetime import datetime
from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_, extract, union_all, func, desc
from datatables import DataTable
from models.Admin import supplyModel

# importing request
from models.Admin.requestModel import Request as Request_M
from models.Admin import requestModel
from schemas.Admin import requestSchema

# importing return
from models.Admin.returnModel import Return as Returns
from models.Admin import returnModel
from schemas.Admin import returnSchema

# importing request details
from models.Admin.requestModel import Request as Request_M
from models.Admin.request_detailModel import Request_Details
from models.Admin.supplyModel import Supplies
from models.Admin import request_detailModel
from schemas.Admin import request_detailSchema

# importing inbound
from models.Admin.inbound_reportModel import Inbound_Reports
from models.Admin.employeeModel import Employees
from models.Admin import inbound_reportModel
from schemas.Admin import inbound_reportSchema

# importing models one by one
from models.Admin.supplyModel import Supplies
from models.Admin.supply_categoryModel import Supply_Categories
from models.Admin.supplierModel import Suppliers
from models.Admin import supplyModel
from schemas.Admin import supplySchema


from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/count',
    tags=['counts'],
    # dependencies=[Depends(get_token)]
)

#================================ Request Table =================================#

@router.get('/request_per_month')
def count_requestper_month(db: Session = Depends(get_db)):
    today = datetime.today()
    req_jan = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 1).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_feb = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 2).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_mar = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 3).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_apr = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 4).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_may = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 5).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_jun = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 6).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_jul = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 7).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_aug = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 8).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_sep = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 9).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_oct = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 10).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_nov = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 11).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    req_dec = db.query(requestModel.Request).filter(extract('month', requestModel.Request.request_date) == 12).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    
    return {
            'January': req_jan,     'May': req_may,         'September': req_sep,
            'February': req_feb,    'June': req_jun,        'October': req_oct,
            'March': req_mar,       'July': req_jul,        'November': req_nov,
            'April': req_apr,       'August': req_aug,      'December': req_dec,
            }

#================================ Return Table =================================#
@router.get('/return_per_month')
def count_return_per_month(db: Session = Depends(get_db)):
    today = datetime.today()
    ret_jan = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 1).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_feb = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 2).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_mar = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 3).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_apr = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 4).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_may = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 5).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_jun = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 6).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_jul = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 7).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_aug = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 8).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_sep = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 9).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_oct = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 10).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_nov = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 11).filter(extract('year', returnModel.Return.return_date) == today.year).count()
    ret_dec = db.query(returnModel.Return).filter(extract('month', returnModel.Return.return_date) == 12).filter(extract('year', returnModel.Return.return_date) == today.year).count()

    return {
            'January': ret_jan,     'May': ret_may,         'September': ret_sep,
            'February': ret_feb,    'June': ret_jun,        'October': ret_oct,
            'March': ret_mar,       'July': ret_jul,        'November': ret_nov,
            'April': ret_apr,       'August': ret_aug,      'December': ret_dec,
            }

#================================ Request Details Table =================================#

@router.get('/most_requested')
def count_most_requested(db: Session = Depends(get_db)):
    query = db.query(Supplies.supply_name, func.count(Request_Details.supply_id)
        ).join(Supplies, Supplies.supply_id == Request_Details.supply_id, isouter = True
        ).join(Request_M, Request_M.request_id == Request_Details.request_id, isouter = True
        ).filter(requestModel.Request.request_type == "To Request"
        ).order_by(desc(func.count(Request_Details.supply_id))
        ).group_by(Request_Details.supply_id
        ).limit(5)

    return query

@router.get('/most_ordered')
def count_most_requested(db: Session = Depends(get_db)):
    query = db.query(Supplies.supply_name, func.count(Request_Details.supply_id)
        ).join(Supplies, Supplies.supply_id == Request_Details.supply_id, isouter = True
        ).join(Request_M, Request_M.request_id == Request_Details.request_id, isouter = True
        ).filter(requestModel.Request.request_type == "For Request"
        ).order_by(desc(func.count(Request_Details.supply_id))
        ).group_by(Request_Details.supply_id
        ).limit(5)

    return query

# GET all request detail
@router.get('/')
def get_all_request_detail(db: Session = Depends(get_db)):
    rd = db.query(request_detailModel.Request_Details, func.count(Request_Details.supply_id)).options(joinedload(request_detailModel.Request_Details.request)
                                                                , joinedload(request_detailModel.Request_Details.supply)).all()
    return {'Request_Details': rd}


#================================ IN/OUT Table =================================#

@router.get('/outbound_per_month')
def count_outbound_per_month(db: Session = Depends(get_db)):
    today = datetime.today()
    outB_jan = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 1).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_feb = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 2).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_mar = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 3).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_apr = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 4).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_may = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 5).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_jun = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 6).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_jul = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 7).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_aug = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 8).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_sep = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 9).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_oct = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 10).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_nov = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 11).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    outB_dec = db.query(requestModel.Request).filter(requestModel.Request.request_type == "For Request").filter(extract('month', requestModel.Request.request_date) == 12).filter(extract('year', requestModel.Request.request_date) == today.year).count()
    
    return {
            'January': outB_jan,     'May': outB_may,         'September': outB_sep,
            'February': outB_feb,    'June': outB_jun,        'October': outB_oct,
            'March': outB_mar,       'July': outB_jul,        'November': outB_nov,
            'April': outB_apr,       'August': outB_aug,      'December': outB_dec,
            }

@router.get('/inbound_per_month')
def count_inbound_month(db: Session = Depends(get_db)):
    today = datetime.today()
    inB_jan = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 1).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_feb = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 2).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_mar = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 3).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_apr = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 4).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_may = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 5).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_jun = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 6).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_jul = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 7).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_aug = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 8).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_sep = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 9).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_oct = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 10).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_nov = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 11).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    inB_dec = db.query(inbound_reportModel.Inbound_Reports).filter(extract('month', inbound_reportModel.Inbound_Reports.created_at) == 12).filter(extract('year', inbound_reportModel.Inbound_Reports.created_at) == today.year).count()
    
    return {
            'January': inB_jan,     'May': inB_may,         'September': inB_sep,
            'February': inB_feb,    'June': inB_jun,        'October': inB_oct,
            'March': inB_mar,       'July': inB_jul,        'November': inB_nov,
            'April': inB_apr,       'August': inB_aug,      'December': inB_dec,
            }
