from sqlalchemy import Integer, String, DateTime, text, Text as Desc
from sqlalchemy.sql.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#-------------------- Suppliers Table ----------------------#
class Suppliers(Base):
    __tablename__ = 'suppliers'

    supplier_id                     = Column(String(36), primary_key=True, default=text('UUID()'))
    supplier_name                   = Column(String(255), nullable=False)
    supplier_contact                = Column(String(255), nullable=False, unique=True)
    supplier_email                  = Column(String(255), nullable=False, unique=True)
    supplier_description            = Column(Desc(255), nullable=False)

    created_at                      = Column(DateTime, default=text('NOW()'))
    updated_at                      = Column(DateTime, onupdate=text('NOW()'))

    #Relationship/s
    s_supplierFK = relationship("Supplies", back_populates="supply_supplier")







