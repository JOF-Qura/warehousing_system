from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#--------------- Request Table ------------------#
class Request(Base):
#Table Name
    __tablename__ = 'request'

#Column
    request_id                  = Column(String(36), primary_key=True, default=text('UUID()'))
    request_date                = Column(DateTime(255), nullable=False, default=text('NOW()'))
    requestor                   = Column(String(255), nullable=False)
    request_type                = Column(String(255), nullable=False)
    request_status              = Column(String(255), nullable=False, default="Pending")

    created_at                  = Column(DateTime, default=text('NOW()'))
    updated_at                  = Column(DateTime, onupdate=text('NOW()'))

#Relationship/s
    #Relationship/s of this Table to other Table/s
    rd_requestFK = relationship('Request_Details', back_populates='request')
    ir_requestFK = relationship('Inbound_Reports', back_populates='requested')
    notif_requestFK = relationship("Notifications", back_populates="request_notif")





