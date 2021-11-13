from fastapi import APIRouter, Request, Depends, HTTPException, Cookie, status
from sqlalchemy import or_
from datatables import DataTable
from models.Admin import notifModel

# importing models one by one
from models.Admin.notifModel import Notifications
from models.Admin.supplyModel import Supplies
from models.Admin.requestModel import Request as Req
from models.Admin.returnModel import Return as Ret

from models.Admin import notifModel
from schemas.Admin import notifSchema
from database import get_db
from dependencies import get_token
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload


router = APIRouter(
    prefix='/notifications',
    tags=['notifications'],
    # dependencies=[Depends(get_token)]
)

#================================ Notifications Table =================================#

# Notifications DataTable
@router.get('/datatable')
def datatable(request: Request, db: Session = Depends(get_db)):
    try:
        def perform_search(queryset, user_input):
            return queryset.filter(
                or_
                (
                    Notifications.notification_id.like('%' + user_input + '%'),
                    Notifications.description.like('%' + user_input + '%'),
                    Notifications.status.like('%' + user_input + '%'),
                    Supplies.supply_name.like('%' + user_input + '%'),
                    Notifications.request_id('%' + user_input + '%'),
                    Notifications.return_id('%' + user_input + '%'),
                    Notifications.created_at.like('%' + user_input + '%'),
                    Notifications.updated_at.like('%' + user_input + '%'),
                )
            )

        table = DataTable(dict(request.query_params), Notifications, db.query(Notifications), 
        [
            'notification_id',
            ('supply_id', 'supply_notif.supply_name'),
            'request_id',
            'return_id',
            'description',
            'status',
            'created_at',
            'updated_at',
        ])

        table.searchable(lambda queryset, user_input: perform_search(queryset, user_input))
    
        return table.json()
    except Exception as e:
        print(e)

# GET all Notifications
@router.get('/')
def get_all_notification(db: Session = Depends(get_db)):
    notif = db.query(notifModel.Notifications).options(joinedload(notifModel.Notifications.supply_notif)).all()
    return notif

# GET Notifications by ID
@router.get('/{notification_id}', response_model=notifSchema.ShowNotification)
def get_one_notification(notification_id:str, db: Session = Depends(get_db)):
    notification = db.query(notifModel.Notifications).filter(notifModel.Notifications.notification_id == notification_id).first()
    if not notification:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Notifications with the id {notification_id} is not available")
    return notification

# CREATE Notifications
@router.post('/')
def create_notification(request: notifSchema.CreateNotification, db: Session = Depends(get_db)):
    to_store = notifModel.Notifications(
        description = request.description,
        status = request.status,
        supply_id = request.supply_id,
        request_id = request.request_id,
        return_id = request.return_id,
    )
    db.add(to_store)
    db.commit()
    return {'message': 'Notification stored successfully.'}

# UPDATE Notifications
@router.put('/{notification_id}')
def update_notification(notification_id: str, notif: notifSchema.UpdateNotification, db: Session = Depends(get_db)): 
    if not db.query(notifModel.Notifications).filter(notifModel.Notifications.notification_id == notification_id).update({
        'status': notif.status,
    }):
        raise HTTPException(404, 'Notifications to update is not found')
    db.commit()
    return {'message': 'Notification updated successfully.'}

# DELETE Notifications
@router.delete('/{notification_id}')
def delete_notification(notification_id: str, db: Session = Depends(get_db)):
    if not db.query(notifModel.Notifications).filter(notifModel.Notifications.notification_id == notification_id, notifModel.Notifications.status == "Resolved").delete():
        raise HTTPException(404, 'Notifications to delete is not found')
    db.commit()
    return {'message': 'Notification removed successfully.'}

