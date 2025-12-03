from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Float, JSON

from .base import Base


class CoffeeEntry(Base):
    __tablename__ = "coffee_entries"

    id = Column(Integer, primary_key=True, index=True)
    coffee_name = Column(String, nullable=False)
    roaster = Column(String, nullable=True)
    origin = Column(String, nullable=True)
    processing = Column(String, nullable=True)
    roast_level = Column(String, nullable=True)
    brewing_method = Column(String, nullable=True)
    rating = Column(Float, nullable=True)
    tasting_notes = Column(String, nullable=True)
    date_tried = Column(DateTime, nullable=True)