from multiprocessing import Event
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Event

class EventForm(FlaskForm):
    eventName = StringField('Event Name', validators=[DataRequired()])
    location = StringField ('Location', validators=[DataRequired()])
    length = IntegerField ('Length', validators=[DataRequired()])
    date = DateField ('Date', validators=[DataRequired()])
    time = StringField ('Time', validators=[DataRequired()])
    description = TextAreaField ('Description', validators=[DataRequired()] )
    submit = SubmitField('Submit')
    
    