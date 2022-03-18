from tokenize import String
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError

class EventForm(FlaskForm):
    eventName = StringField('Event Name', validators=[DataRequired()])
    location = StringField ('Location', validators=[DataRequired()])
    length = IntegerField ('Length', validators=[DataRequired()])
    date = DateField ('Date', validators=[DataRequired()])
    time = StringField ('Time', validators=[DataRequired()])
    description = TextAreaField ('Desription', validators=[DataRequired()])
    submit = SubmitField('Submit')
    
    