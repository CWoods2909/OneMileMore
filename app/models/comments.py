from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    eventId = db.Column(db.Integer, db.ForeignKey('events.id'), ondelete='CASCADE',nullable=False)
    createdAt = db.Column(db.Date, nullable=False)
    updatedAt = db.Column(db.Date, nullable=False)
    
    def to_dict(self):
        return{
            "id": self.id,
            "body": self.body,
            "userId": self.userId,
            "eventId": self.eventId
        }