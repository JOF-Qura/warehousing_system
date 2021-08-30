from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#--------------- Supply_Cateogries Table ------------------#
class Supply_Categories(Base):
#Table Name
    __tablename__ = 'supply_categories'

#Columns
    supply_category_id              = Column(String(36), primary_key=True, default=text('UUID()'))
    supply_category_name            = Column(String(255), nullable=False, unique=True)
    supply_category_description     = Column(Desc(255), nullable=True)

    created_at                      = Column(DateTime, default=text('NOW()'))
    updated_at                      = Column(DateTime, onupdate=text('NOW()'))

#Relationship/s
    #Relationship/s of this Table to other Table/s
    il_supply_categoryFK = relationship('Inventory_Locations', back_populates='inventory_location_category')
    s_supply_categoryFK = relationship('Supplies', back_populates='supply_category')






