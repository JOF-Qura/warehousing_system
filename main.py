from fastapi import FastAPI, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from database import Base, get_db, engine
from dependencies import get_token

# importing all admin routes
from routes.Admin import (authRoutes
                    , employeeRoutes
                    , supplyRoutes
                    , userRoutes
                    , postRoutes 
                    , hospital_departmentRoutes
                    , inbound_reportRoutes
                    , inventory_locationRoutes
                    , inventoryRoutes
                    , outbound_report_detailRoutes
                    , outbound_reportRoutes
                    , request_detailRoutes
                    , requestRoutes
                    , supplierRoutes
                    , supply_categoriesRoutes
                    , warehouseRoutes
                    , return_detailRoutes
                    , returnRoutes
                    , notifRoutes
                    )
from routes.Admin.count import (countRequestDetail_Supply
                                , countSupply
                                , countRequest_Pending
                                , countReturn_Pending
                                , countFromHospital
                                , countFromProcurement
                                )

from routes.Admin.filter import (requestFilter
                                )

# importing all models
from models.Admin import (userModel
                    , employeeModel
                    , warehouseModel
                    , supplierModel
                    , inventoryModel
                    , hospital_departmentModel
                    , inbound_reportModel
                    , inventory_locationModel
                    , outbound_report_detailModel
                    , outbound_reportModel
                    , request_detailModel
                    , requestModel
                    , supply_categoryModel
                    , supplyModel 
                    , postModel
                    , returnModel
                    , return_detailModel
                    , notifModel)

# importing models one by one
from models.Admin.userModel import Users
from models.Admin.supplyModel import Supplies
from models.Admin.supply_categoryModel import Supply_Categories
from models.Admin.inventoryModel import Inventories
from models.Admin.inventory_locationModel import Inventory_Locations
from models.Admin.requestModel import Request as RequestModel
from models.Admin.returnModel import Return as ReturnModel
from models.Admin.request_detailModel import Request_Details
from models.Admin.return_detailModel import Return_Details
from models.Admin.outbound_reportModel import Outbound_Reports
from models.Admin.outbound_report_detailModel import Outbound_Report_Details
from models.Admin.inbound_reportModel import Inbound_Reports
from models.Admin.supplierModel import Suppliers
from models.Admin.warehouseModel import Warehouses
from models.Admin.hospital_departmentModel import Hospital_Departments
from models.Admin.employeeModel import Employees
from models.Admin.notifModel import Notifications
from models.Admin.postModel import Post


# creating all models
Base.metadata.create_all(engine)

app = FastAPI()
# Mount static folder
app.mount('/static', StaticFiles(directory='static'), name='static')

# Register Routes
app.include_router(authRoutes.router)
app.include_router(userRoutes.router)
app.include_router(employeeRoutes.router)
app.include_router(supplyRoutes.router)
app.include_router(hospital_departmentRoutes.router)
app.include_router(inbound_reportRoutes.router)
app.include_router(inventory_locationRoutes.router)
app.include_router(inventoryRoutes.router)
app.include_router(outbound_report_detailRoutes.router)
app.include_router(outbound_reportRoutes.router)
app.include_router(requestRoutes.router)
app.include_router(returnRoutes.router)
app.include_router(request_detailRoutes.router)
app.include_router(return_detailRoutes.router)
app.include_router(supplierRoutes.router)
app.include_router(supply_categoriesRoutes.router)
app.include_router(warehouseRoutes.router)
app.include_router(notifRoutes.router)


app.include_router(countRequestDetail_Supply.router)
app.include_router(countSupply.router)
app.include_router(countRequest_Pending.router)
app.include_router(countReturn_Pending.router)
app.include_router(countFromHospital.router)
app.include_router(countFromProcurement.router)

app.include_router(requestFilter.router)

#Saling Pusa
app.include_router(postRoutes.router)


# Register template folder
template = Jinja2Templates('templates')

#Template
# @app.get('/', response_class=HTMLResponse)
# def index(request: Request, db: Session = Depends(get_db)):
#     try:
#         posts = db.query(Post).all()
#         return template.TemplateResponse('index.html', 
#         {
#             'request': request,
#             'posts': posts
#         })
#     except Exception as e:
#         print(e)

# ---------------------------- HomePage Template ------------------------------ #
@app.get('/homies/', response_class=HTMLResponse)
def login(request: Request):
    return template.TemplateResponse('warehousing/index.html', 
    {
        'request': request
    })


# ---------------------------- Access Template ------------------------------ #
@app.get('/warehousing/', response_class=HTMLResponse)
def login(request: Request):
    return template.TemplateResponse('warehousing/access/login.html', 
    {
        'request': request
    })

# ---------------------------- Admin Template ------------------------------ #
@app.get('/warehousing/admin/', response_class=HTMLResponse)
def dashhboard(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    return template.TemplateResponse('warehousing/admin/content/dashboard.html', 
    {
        'request': request
    })

@app.get('/warehousing/admin/dashboard', response_class=HTMLResponse)
def dashhboard(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    return template.TemplateResponse('warehousing/admin/content/dashboard.html', 
    {
        'request': request
    })

@app.get('/warehousing/admin/users/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        users = db.query(Users).all()
        return template.TemplateResponse('warehousing/admin/content/users.html', 
        {
            'request': request,
            'users': users
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/supplies/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        supplies = db.query(Supplies).all()
        return template.TemplateResponse('warehousing/admin/content/supplies.html', 
        {
            'request': request,
            'supplies': supplies
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/supply_categories/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        supply_categories = db.query(Supply_Categories).all()
        return template.TemplateResponse('warehousing/admin/content/supply_categories.html', 
        {
            'request': request,
            'supply_categories': supply_categories
        })
    except Exception as e:
        print(e)

        
@app.get('/warehousing/admin/inventories/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        inventories = db.query(Inventories).all()
        return template.TemplateResponse('warehousing/admin/content/inventories.html', 
        {
            'request': request,
            'inventories': inventories
        })
    except Exception as e:
        print(e)
            
@app.get('/warehousing/admin/inventory_locations/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        inventory_locations = db.query(Inventory_Locations).all()
        return template.TemplateResponse('warehousing/admin/content/inventory_locations.html', 
        {
            'request': request,
            'inventory_locations': inventory_locations
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/request/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        request_model = db.query(RequestModel).all()
        return template.TemplateResponse('warehousing/admin/content/request.html', 
        {
            'request': request,
            'request_model': request_model
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/return/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        return_model = db.query(ReturnModel).all()
        return template.TemplateResponse('warehousing/admin/content/return.html', 
        {
            'request': request,
            'return_model': return_model
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/outbound_reports/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        o_reports = db.query(Outbound_Reports).all()
        return template.TemplateResponse('warehousing/admin/content/outbound_reports.html', 
        {
            'request': request,
            'o_reports': o_reports
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/inbound_reports/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        i_reports = db.query(Inbound_Reports).all()
        return template.TemplateResponse('warehousing/admin/content/inbound_reports.html', 
        {
            'request': request,
            'i_reports': i_reports
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/suppliers/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        suppliers = db.query(Suppliers).all()
        return template.TemplateResponse('warehousing/admin/content/suppliers.html', 
        {
            'request': request,
            'suppliers': suppliers
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/warehouses/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        warehouses = db.query(Warehouses).all()
        return template.TemplateResponse('warehousing/admin/content/warehouses.html', 
        {
            'request': request,
            'warehouses': warehouses
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/hospital_departments/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        hospital_departments = db.query(Hospital_Departments).all()
        return template.TemplateResponse('warehousing/admin/content/hospital_departments.html', 
        {
            'request': request,
            'hospital_departments': hospital_departments
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/employees/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        employees = db.query(Employees).all()
        return template.TemplateResponse('warehousing/admin/content/employees.html', 
        {
            'request': request,
            'employees': employees
        })
    except Exception as e:
        print(e)

# ------------ Admin View --------------- #
@app.get('/warehousing/admin/supplies/{supply_id}', response_class=HTMLResponse)
def index(request: Request, supply_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        supplies = db.query(Supplies).filter(Supplies.supply_id == supply_id).first()
        return template.TemplateResponse('warehousing/admin/content/viewSupplies.html', 
        {
            'request': request,
            'supplies': supplies
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/inventories/{inventory_id}', response_class=HTMLResponse)
def index(request: Request, inventory_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        inventories = db.query(Inventories).filter(Inventories.inventory_id == inventory_id).first()
        return template.TemplateResponse('warehousing/admin/content/viewInventories.html', 
        {
            'request': request,
            'inventories': inventories
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/request_details', response_class=HTMLResponse)
def index(request: Request, request_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        req = db.query(Request_Details).filter(Request_Details.request_id == request_id).all()
        return template.TemplateResponse('warehousing/admin/content/viewRequest.html', 
        {
            'request': request,
            'req': req
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/return_details', response_class=HTMLResponse)
def index(request: Request, return_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        ret = db.query(Return_Details).filter(Return_Details.return_id == return_id).all()
        return template.TemplateResponse('warehousing/admin/content/viewReturn.html', 
        {
            'request': request,
            'ret': ret
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/outbound_report_details', response_class=HTMLResponse)
def index(request: Request, outbound_report_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        out_report_d = db.query(Outbound_Report_Details).filter(Outbound_Report_Details.outbound_report_id == outbound_report_id).all()
        return template.TemplateResponse('warehousing/admin/content/viewOutboundReport.html', 
        {
            'request': request,
            'out_report_d': out_report_d
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/inbound_report_details', response_class=HTMLResponse)
def index(request: Request, inbound_report_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        in_report_d = db.query(Inbound_Reports).filter(Inbound_Reports.inbound_report_id == inbound_report_id).all()
        return template.TemplateResponse('warehousing/admin/content/viewInboundReport.html', 
        {
            'request': request,
            'in_report_d': in_report_d
        })
    except Exception as e:
        print(e)



# ---------------------------- Manager Template ------------------------------ #
@app.get('/warehousing/manager/', response_class=HTMLResponse)
def dashhboard(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    # users = db.query(Users).filter(Users.user_email == current_user).first()
    return template.TemplateResponse('warehousing/manager/content/dashboard.html', 
    {
        'request': request,
        # 'users': users
    })

@app.get('/warehousing/manager/dashboard', response_class=HTMLResponse)
def dashhboard(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    return template.TemplateResponse('warehousing/manager/content/dashboard.html', 
    {
        'request': request
    })

@app.get('/warehousing/manager/supplies/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        supplies = db.query(Supplies).all()
        return template.TemplateResponse('warehousing/manager/content/supplies.html', 
        {
            'request': request,
            'supplies': supplies
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/manager/supply_categories/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        supply_categories = db.query(Supply_Categories).all()
        return template.TemplateResponse('warehousing/manager/content/supply_categories.html', 
        {
            'request': request,
            'supply_categories': supply_categories
        })
    except Exception as e:
        print(e)

        
@app.get('/warehousing/manager/inventories/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        inventories = db.query(Inventories).all()
        return template.TemplateResponse('warehousing/manager/content/inventories.html', 
        {
            'request': request,
            'inventories': inventories
        })
    except Exception as e:
        print(e)
            
@app.get('/warehousing/manager/inventory_locations/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        inventory_locations = db.query(Inventory_Locations).all()
        return template.TemplateResponse('warehousing/manager/content/inventory_locations.html', 
        {
            'request': request,
            'inventory_locations': inventory_locations
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/manager/request/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        request_model = db.query(RequestModel).all()
        return template.TemplateResponse('warehousing/manager/content/request.html', 
        {
            'request': request,
            'request_model': request_model
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/manager/return/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        return_model = db.query(ReturnModel).all()
        return template.TemplateResponse('warehousing/manager/content/return.html', 
        {
            'request': request,
            'return_model': return_model
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/manager/outbound_reports/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        o_reports = db.query(Outbound_Reports).all()
        return template.TemplateResponse('warehousing/manager/content/outbound_reports.html', 
        {
            'request': request,
            'o_reports': o_reports
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/manager/inbound_reports/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        i_reports = db.query(Inbound_Reports).all()
        return template.TemplateResponse('warehousing/manager/content/inbound_reports.html', 
        {
            'request': request,
            'i_reports': i_reports
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/manager/suppliers/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        suppliers = db.query(Suppliers).all()
        return template.TemplateResponse('warehousing/manager/content/suppliers.html', 
        {
            'request': request,
            'suppliers': suppliers
        })
    except Exception as e:
        print(e)


@app.get('/warehousing/manager/employees/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        employees = db.query(Employees).all()
        return template.TemplateResponse('warehousing/manager/content/employees.html', 
        {
            'request': request,
            'employees': employees
        })
    except Exception as e:
        print(e)

# ------------ Manager View --------------- #
@app.get('/warehousing/manager/supplies/{supply_id}', response_class=HTMLResponse)
def index(request: Request, supply_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        supplies = db.query(Supplies).filter(Supplies.supply_id == supply_id).first()
        return template.TemplateResponse('warehousing/manager/content/viewSupplies.html', 
        {
            'request': request,
            'supplies': supplies
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/manager/inventories/{inventory_id}', response_class=HTMLResponse)
def index(request: Request, inventory_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        inventories = db.query(Inventories).filter(Inventories.inventory_id == inventory_id).first()
        return template.TemplateResponse('warehousing/manager/content/viewInventories.html', 
        {
            'request': request,
            'inventories': inventories
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/manager/request_details', response_class=HTMLResponse)
def index(request: Request, request_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        req = db.query(Request_Details).filter(Request_Details.request_id == request_id).all()
        return template.TemplateResponse('warehousing/manager/content/viewRequest.html', 
        {
            'request': request,
            'req': req
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/manager/outbound_report_details', response_class=HTMLResponse)
def index(request: Request, outbound_report_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        out_report_d = db.query(Outbound_Report_Details).filter(Outbound_Report_Details.outbound_report_id == outbound_report_id).all()
        return template.TemplateResponse('warehousing/manager/content/viewOutboundReport.html', 
        {
            'request': request,
            'out_report_d': out_report_d
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/manager/inbound_report_details', response_class=HTMLResponse)
def index(request: Request, inbound_report_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        in_report_d = db.query(Inbound_Reports).filter(Inbound_Reports.inbound_report_id == inbound_report_id).all()
        return template.TemplateResponse('warehousing/manager/content/viewInboundReport.html', 
        {
            'request': request,
            'in_report_d': in_report_d
        })
    except Exception as e:
        print(e)

# ---------------------------- Staff Template ------------------------------ #
@app.get('/warehousing/staff/', response_class=HTMLResponse)
def dashhboard(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    # users = db.query(Users).filter(Users.user_email == current_user).first()
    return template.TemplateResponse('warehousing/staff/content/dashboard.html', 
    {
        'request': request,
        # 'users': users
    })

@app.get('/warehousing/staff/dashboard', response_class=HTMLResponse)
def dashhboard(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    return template.TemplateResponse('warehousing/staff/content/dashboard.html', 
    {
        'request': request
    })

@app.get('/warehousing/staff/supplies/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        supplies = db.query(Supplies).all()
        return template.TemplateResponse('warehousing/staff/content/supplies.html', 
        {
            'request': request,
            'supplies': supplies
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/staff/supply_categories/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        supply_categories = db.query(Supply_Categories).all()
        return template.TemplateResponse('warehousing/staff/content/supply_categories.html', 
        {
            'request': request,
            'supply_categories': supply_categories
        })
    except Exception as e:
        print(e)

        
@app.get('/warehousing/staff/inventories/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        inventories = db.query(Inventories).all()
        return template.TemplateResponse('warehousing/staff/content/inventories.html', 
        {
            'request': request,
            'inventories': inventories
        })
    except Exception as e:
        print(e)
            
@app.get('/warehousing/staff/inventory_locations/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        inventory_locations = db.query(Inventory_Locations).all()
        return template.TemplateResponse('warehousing/staff/content/inventory_locations.html', 
        {
            'request': request,
            'inventory_locations': inventory_locations
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/staff/request/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        request_model = db.query(RequestModel).all()
        return template.TemplateResponse('warehousing/staff/content/request.html', 
        {
            'request': request,
            'request_model': request_model
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/staff/return/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        return_model = db.query(ReturnModel).all()
        return template.TemplateResponse('warehousing/staff/content/return.html', 
        {
            'request': request,
            'return_model': return_model
        })
    except Exception as e:
        print(e)

# ------------ Staff View --------------- #
@app.get('/warehousing/staff/supplies/{supply_id}', response_class=HTMLResponse)
def index(request: Request, supply_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        supplies = db.query(Supplies).filter(Supplies.supply_id == supply_id).first()
        return template.TemplateResponse('warehousing/staff/content/viewSupplies.html', 
        {
            'request': request,
            'supplies': supplies
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/staff/inventories/{inventory_id}', response_class=HTMLResponse)
def index(request: Request, inventory_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        inventories = db.query(Inventories).filter(Inventories.inventory_id == inventory_id).first()
        return template.TemplateResponse('warehousing/staff/content/viewInventories.html', 
        {
            'request': request,
            'inventories': inventories
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/staff/request_details', response_class=HTMLResponse)
def index(request: Request, request_id: str, db: Session = Depends(get_db), current_user: Users = Depends(get_token)):
    try:
        req = db.query(Request_Details).filter(Request_Details.request_id == request_id).all()
        return template.TemplateResponse('warehousing/staff/content/viewRequest.html', 
        {
            'request': request,
            'req': req
        })
    except Exception as e:
        print(e)