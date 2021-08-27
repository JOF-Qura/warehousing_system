from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.dialects import mysql

#--------------- Outbound_Report_Details Table ------------------#
class Outbound_Report_Details(Base):
#Table Name
    __tablename__ = 'outbound_report_details'

#Columns
    outbound_r_details_id       = Column(String(36), primary_key=True, default=text('UUID()'))
    status                      = Column(String(255), nullable=False)
    quantity                    = Column(mysql.INTEGER(20), nullable=False)

    created_at                  = Column(DateTime, default=text('NOW()'))
    updated_at                  = Column(DateTime, onupdate=text('NOW()'))

    #Foreignkey
    outbound_report_id          = Column(String(36), ForeignKey('outbound_reports.outbound_report_id'), nullable=True)
    inventory_id                = Column(String(36), ForeignKey('inventories.inventory_id'), nullable=True)

#Relationship/s
    #Relationship/s of this Table
    outbound_report = relationship('Outbound_Reports', back_populates='ord_outbound_reportFK')
    inventory = relationship('Inventories', back_populates='ord_inventoryFK')





