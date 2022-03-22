from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    eventId = db.Column(db.Integer, db.ForeignKey('events.id', ondelete='CASCADE'), nullable=False)
    
    user_info = db.relationship('User', back_populates='comment_info')
    
    def to_dict(self):
        return{
            "id": self.id,
            "body": self.body,
            "userId": self.userId,
            "eventId": self.eventId,
            "username": self.user_info.username
        }