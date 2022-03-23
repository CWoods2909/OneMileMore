from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError, Length


class EventForm(FlaskForm):
    eventName = StringField('Event Name', validators=[DataRequired(), Length(max=100, min=5, message='Event name must be longer than 5 characters and less than 100 characters.')])
    location = StringField ('Location', validators=[DataRequired(), Length(max=100, min=5, message='Location must be longer than 5 characters and less than 100 characters.')])
    length = IntegerField ('Length', validators=[DataRequired()])
    date = DateField ('Date', validators=[DataRequired()])
    time = StringField ('Time', validators=[DataRequired()])
    description = TextAreaField ('Description', validators=[DataRequired(), Length(max=500, min=10, message='Description must be at least 10 characters and less than 500 characters')] )
    submit = SubmitField('Submit')
    
    