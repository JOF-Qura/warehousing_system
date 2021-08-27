from fastapi import FastAPI, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from database import Base, get_db, engine

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
                    , postModel)

# importing models one by one
from models.Admin.userModel import Users
from models.Admin.supplyModel import Supplies
from models.Admin.supply_categoryModel import Supply_Categories
from models.Admin.inventoryModel import Inventories
from models.Admin.inventory_locationModel import Inventory_Locations
from models.Admin.requestModel import Request as RequestModel
from models.Admin.outbound_reportModel import Outbound_Reports
from models.Admin.inbound_reportModel import Inbound_Reports
from models.Admin.supplierModel import Suppliers
from models.Admin.warehouseModel import Warehouses
from models.Admin.hospital_departmentModel import Hospital_Departments
from models.Admin.employeeModel import Employees
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
app.include_router(request_detailRoutes.router)
app.include_router(supplierRoutes.router)
app.include_router(supply_categoriesRoutes.router)
app.include_router(warehouseRoutes.router)

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

#Admin Template

@app.get('/warehousing/', response_class=HTMLResponse)
def dashhboard(request: Request):
    return template.TemplateResponse('warehousing/admin/access/login.html', 
    {
        'request': request
    })

@app.get('/warehousing/admin/', response_class=HTMLResponse)
def dashhboard(request: Request):
    return template.TemplateResponse('warehousing/admin/content/dashboard.html', 
    {
        'request': request
    })

@app.get('/warehousing/admin/dashboard', response_class=HTMLResponse)
def dashhboard(request: Request):
    return template.TemplateResponse('warehousing/admin/content/dashboard.html', 
    {
        'request': request
    })

@app.get('/warehousing/admin/users/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db)):
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
def index(request: Request, db: Session = Depends(get_db)):
    try:
        supplies = db.query(Supplies).all()
        return template.TemplateResponse('warehousing/admin/content/supplies.html', 
        {
            'request': request,
            'supplies': supplies
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/supplies/{supply_id}', response_class=HTMLResponse)
def index(request: Request, supply_id: str, db: Session = Depends(get_db)):
    try:
        supplies = db.query(Supplies).filter(Supplies.supply_id == supply_id).first()
        return template.TemplateResponse('warehousing/admin/content/viewSupplies.html', 
        {
            'request': request,
            'supplies': supplies
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/supply_categories/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db)):
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
def index(request: Request, db: Session = Depends(get_db)):
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
def index(request: Request, db: Session = Depends(get_db)):
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
def index(request: Request, db: Session = Depends(get_db)):
    try:
        request_model = db.query(RequestModel).all()
        return template.TemplateResponse('warehousing/admin/content/request.html', 
        {
            'request': request,
            'request_model': request_model
        })
    except Exception as e:
        print(e)

@app.get('/warehousing/admin/outbound_reports/', response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db)):
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
def index(request: Request, db: Session = Depends(get_db)):
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
def index(request: Request, db: Session = Depends(get_db)):
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
def index(request: Request, db: Session = Depends(get_db)):
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
def index(request: Request, db: Session = Depends(get_db)):
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
def index(request: Request, db: Session = Depends(get_db)):
    try:
        employees = db.query(Employees).all()
        return template.TemplateResponse('warehousing/admin/content/employees.html', 
        {
            'request': request,
            'employees': employees
        })
    except Exception as e:
        print(e)




