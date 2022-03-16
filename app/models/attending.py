from .db import db

attending = db.Table(
    'attending',
    db.Column('userId', db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True, nullable=False),
    db.Column('eventId', db.Integer, db.ForeignKey('events.id'), primary_key=True, nullable=False)
)