from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.expression import true
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#------------ Notifications Table ------------------#
class Notifications(Base):
#Table Name
    __tablename__ = 'notifications'

#Columns
    notification_id                 = Column(String(36), primary_key=True, default=text('UUID()'))
    description                     = Column(String(255), nullable=True)
    status                          = Column(String(255), nullable=False, default="Pending")

    created_at                      = Column(DateTime, default=text('NOW()'))
    updated_at                      = Column(DateTime, onupdate=text('NOW()'))

    #Foreignkey
    supply_id                       = Column(String(36), ForeignKey('supplies.supply_id'), nullable=True, unique=True)
    request_id                      = Column(String(36), ForeignKey('request.request_id'), nullable=True, unique=True)
    return_id                       = Column(String(36), ForeignKey('return.return_id'), nullable=True, unique=True)



    
#Relationship/s
    #Relationship/s of this Table
    supply_notif = relationship("Supplies", back_populates="notif_supplesFK")
    request_notif = relationship("Request", back_populates="notif_requestFK")
    return_notif = relationship("Return", back_populates="notif_returnFK")

    






