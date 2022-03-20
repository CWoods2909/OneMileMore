from flask import Flask
from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    body = TextAreaField('Provide Comment', validators=[DataRequired(), Length(max=1000, min=5, message='Comment must be longer than 5 charachters but less than 1000')])
    submit = SubmitField('Submit')