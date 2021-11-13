from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#--------------- Return Table ------------------#
class Return(Base):
#Table Name
    __tablename__ = 'return'

#Column
    return_id                   = Column(String(36), primary_key=True, default=text('UUID()'))
    return_date                 = Column(DateTime(255), nullable=False)
    returner                    = Column(String(255), nullable=False)
    return_type                 = Column(String(255), nullable=False)
    return_status               = Column(String(255), nullable=False, default="Pending")

    created_at                  = Column(DateTime, default=text('NOW()'))
    updated_at                  = Column(DateTime, onupdate=text('NOW()'))

#Relationship/s
    #Relationship/s of this Table to other Table/s
    retd_returnFK = relationship('Return_Details', back_populates='returns')
    notif_returnFK = relationship("Notifications", back_populates="return_notif")




