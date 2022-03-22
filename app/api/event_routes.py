from flask import Blueprint, request
from flask_login import current_user
from app.models import Event, db
from app.forms import EventForm

event_routes = Blueprint('events', __name__)

@event_routes.route('/all')
# @login_required
def all_events_api():
    events = Event.query.all()
    return {'events': [event.to_dict() for event in events]}



@event_routes.route('/create', methods=['POST'])
# @login_required
def post_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event(
            eventName = form.data['eventName'],
            location = form.data['location'],
            userId = current_user.id,
            length = form.data['length'],
            date = form.data['date'],
            time = form.data['time'],
            description = form.data['description']
        )
        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    if form.errors:
        return {'errors': form.errors}, 401


@event_routes.route('/<int:id>', methods=['GET'])
# @login_required
def single_event(id):
    event = Event.query.get(id)
    return event.to_dict()
        
        
@event_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def event_api(id):
    event = Event.query.get(id)
    db.session.delete(event)
    db.session.commit()
    return event.to_dict()


@event_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def edit_event(id):
    event = Event.query.get(id)
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
            event.eventName = form.data['eventName']
            event.location = form.data['location']
            event.userId = current_user.id
            event.length = form.data['length']
            event.date = form.data['date']
            event.time = form.data['time']
            event.description = form.data['description']
            
            db.session.commit()
            return event.to_dict()

    if form.errors:
        return {"errors": form.errors}, 401