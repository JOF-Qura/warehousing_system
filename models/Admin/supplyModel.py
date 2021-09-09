from sqlalchemy import Integer, String, DateTime, text, Text as Desc, DECIMAL
from sqlalchemy.sql.expression import true
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.dialects import mysql
#-------------------- Supplies Table ------------------------#
class Supplies(Base):
#Table Name
    __tablename__ = 'supplies'

#Columns
    supply_id                       = Column(String(36), primary_key=True, default=text('UUID()'))
    supply_name                     = Column(String(255), nullable=False)
    supply_quantity                 = Column(mysql.INTEGER(20), nullable=False)
    supply_unit_type                = Column(String(255), nullable=False)
    supply_unit_cost                = Column(DECIMAL, nullable=False)
    supply_description              = Column(Desc(255), nullable=False)
    supply_reorder_interval         = Column(String(255), nullable=False)
    supply_expiration               = Column(DateTime(255), nullable=True)
    supply_status                   = Column(String(255), nullable=True, default="Good")

    created_at                      = Column(DateTime, default=text('NOW()'))
    updated_at                      = Column(DateTime, onupdate=text('NOW()'))

    #Foreignkey
    supplier_id                     = Column(String(36), ForeignKey('suppliers.supplier_id'), nullable=True)
    supply_category_id              = Column(String(36), ForeignKey('supply_categories.supply_category_id'), nullable=True)

#Relationship/s
    #Relationship/s of this Table
    supply_supplier = relationship("Suppliers", back_populates="s_supplierFK")
    supply_category = relationship("Supply_Categories", back_populates="s_supply_categoryFK")

    #Relationship/s of this Table to other Table/s
    inventory_suppliesFK = relationship("Inventories", back_populates="inventory_supply")
    notif_supplesFK = relationship("Notifications", back_populates="supply_notif")
    rd_suppliesFK = relationship("Request_Details", back_populates="supply")
    retd_suppliesFK = relationship("Return_Details", back_populates="return_supply")







