from multiprocessing import Event
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Event

def event_exists(form, field):
    eventName = field.data
    event = Event.query.filter(Event.eventName == eventName).first()
    if event:
        raise ValidationError('That event name already exists.')


class EventForm(FlaskForm):
    eventName = StringField('Event Name', validators=[DataRequired(), event_exists])
    location = StringField ('Location', validators=[DataRequired()])
    length = IntegerField ('Length', validators=[DataRequired()])
    date = DateField ('Date', validators=[DataRequired()])
    time = StringField ('Time', validators=[DataRequired()])
    description = TextAreaField ('Description', validators=[DataRequired()] )
    submit = SubmitField('Submit')
    
    