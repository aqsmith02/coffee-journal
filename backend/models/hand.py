from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Float, JSON

from .base import Base


class PokerHand(Base):
    __tablename__ = "hands"

    id = Column(Integer, primary_key=True, index=True)
    player_name = Column(String, nullable=False)
    opponent_name = Column(String, nullable=True)
    stakes = Column(String, nullable=True)
    player_cards = Column(String, nullable=True)
    opponent_cards = Column(String, nullable=True)
    # Community and streets stored as JSON structures
    community = Column(JSON, nullable=True)
    streets = Column(JSON, nullable=True)
    total_pot = Column(Float, nullable=True)
    notes = Column(String, nullable=True)
    winner = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)