from datetime import date
from enum import unique
from .db import db


class Event(db.Model):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    eventName = db.Column(db.String(100), nullable=False, unique=True)
    location = db.Column(db.String(100), nullable=False)
    length = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(10), nullable=False)
    description = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.Date, nullable=False)
    updatedAt = db.Column(db.Date, nullable=False)
    
    db.relationship('Comment', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            "id": self.id,
            "eventName": self.eventName,
            "location": self.location,
            "length": self.length,
            "date": self.date,
            "time": self.time,
            "description": self.description
        }