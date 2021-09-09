from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.expression import true
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#------------ Inventories Table ------------------#
class Inventories(Base):
#Table Name
    __tablename__ = 'inventories'

#Columns
    inventory_id                    = Column(String(36), primary_key=True, default=text('UUID()'))

    created_at                      = Column(DateTime, default=text('NOW()'))
    updated_at                      = Column(DateTime, onupdate=text('NOW()'))

    #Foreignkey
    inventory_location_id           = Column(String(36), ForeignKey('inventory_locations.inventory_location_id'), nullable=True)
    supply_id                       = Column(String(36), ForeignKey('supplies.supply_id'), nullable=True, unique=True)
    
#Relationship/s
    #Relationship/s of this Table
    inventory_location = relationship("Inventory_Locations", back_populates="inventory_ilFK")
    inventory_supply = relationship("Supplies", back_populates="inventory_suppliesFK")

    #Relationship/s of this Table to other Table/sss
    ord_inventoryFK = relationship("Outbound_Report_Details", back_populates="inventory")
    






