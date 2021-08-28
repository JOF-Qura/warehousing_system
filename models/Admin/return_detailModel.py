from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.dialects import mysql

#--------------- Request Detail Table ------------------#
class Return_Details(Base):
#Table Name
    __tablename__ = 'return_details'

#Columns
    return_detail_id            = Column(String(36), primary_key=True, default=text('UUID()'))
    quantity                    = Column(mysql.INTEGER(20), nullable=False)
    status                      = Column(String(255), nullable=False, default="Pending")

    created_at                  = Column(DateTime, default=text('NOW()'))
    updated_at                  = Column(DateTime, onupdate=text('NOW()'))

    #Foreignkey
    return_id                   = Column(String(36), ForeignKey('return.return_id'), nullable=True)
    supply_id                   = Column(String(36), ForeignKey('supplies.supply_id'), nullable=True)

#Relationship/s
    #Relationship/s of this Table
    returns = relationship('Return', back_populates='retd_returnFK')
    return_supply = relationship('Supplies', back_populates='retd_suppliesFK')







