from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Event, db
from app.forms.event_form import EventForm

event_routes = Blueprint('events', __name__)

@event_routes('/', methods=['GET', 'POST'])
@login_required
def all_events_api():
    form = EventForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event(
            eventName = form.data('eventName'),
            location = form.data('location'),
            length = form.data('length'),
            date = form.data('date'),
            time = form.data('time'),
            description = form.data('description')
        )
        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    if form.errors:
        return {'errors': form.errors}
    
    events = Event.query.all()
    return {'events': [event.to_dict() for event in events]}
        