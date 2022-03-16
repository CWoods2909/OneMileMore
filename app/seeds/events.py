from datetime import datetime
from app.models import db, Event

def seed_events():
    event1 = Event(
        eventName = 'The best riding even ever',
        location = '111 South Main, Fort Worth, Texas 76134',
        length = 60,
        date = "Mar 13 2022",
        time = "3:30pm",
        description = 'This will be a pretty fast paced ride.  Bring your big boy pants and plenty of energy gels.',
        createdAt = datetime.now(),
        updatedAt = datetime.now()
    )
    event2 = Event(
        eventName = 'Sunday funday ride',
        location = '11925 North Clay, Fort Worth, Texas 76134',
        length = 20,
        date = "Mar 19 2022",
        time = "10:30am",
        description = 'Pretty mellow ride just to loosen up the sore muscles.',
        createdAt = datetime.now(),
        updatedAt = datetime.now()
    )
    event3 = Event(
        eventName = 'Race prep',
        location = '4209 Big Bend road, Fort Worth, Texas 76134',
        length = 30,
        date = "Mar 28 2022",
        time = "7:30am",
        description = 'Last ride before the race on Sunday, will be pretty mild pace.',
        createdAt = datetime.now(),
        updatedAt = datetime.now()
    )
    
    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.commit()
    
    
def undo_events():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()