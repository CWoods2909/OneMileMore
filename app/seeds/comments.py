from app.models import db, Comment
from datetime import datetime

def seed_comments():
    comment1 = Comment(
        body = 'This seems like a fun ride, cant wait.  Ill be there for sure.',
        userId = 2,
        eventId = 2,
        
    )
    comment2 = Comment(
        body = 'Looking forward to this ride, can really use the miles',
        userId = 3,
        eventId = 1,
    )
    comment3 = Comment(
        body = 'Great idea, my legs are killing me from the week.',
        userId = 1,
        eventId = 2,
    )
    
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    
    db.session.commit()
    
def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()