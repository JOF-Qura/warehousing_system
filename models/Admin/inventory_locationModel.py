from enum import unique
from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#-------------- Inventory_Locations Table ------------------#
class Inventory_Locations(Base):
#Table Name
    __tablename__ = 'inventory_locations'

#Column
    inventory_location_id           = Column(String(36), primary_key=True, default=text('UUID()'))
    inventory_location_name         = Column(String(255), nullable=False, unique=True)

    created_at                      = Column(DateTime, default=text('NOW()'))
    updated_at                      = Column(DateTime, onupdate=text('NOW()'))

    #Foreignkey
    supply_category_id              = Column(String(36), ForeignKey('supply_categories.supply_category_id'), nullable=False)

#Relationship/s
    #Relationship/s of this Table
    inventory_location_category = relationship("Supply_Categories", back_populates="il_supply_categoryFK")

    #Relationship/s of this Table to other Table/s
    inventory_ilFK = relationship("Inventories", back_populates="inventory_location")
    





