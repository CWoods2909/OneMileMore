from flask import Blueprint, request
from flask_login import current_user
from app.models.db import db
from app.models import Comment, User
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>', methods=['GET'])
def get_comments(id):
    comments = Comment.query.filter(Comment.eventId == id).join(User, User.id == Comment.userId).add_columns(Comment.id, Comment.body, Comment.eventId, Comment.userId, User.username).all()
    print(comments)
    
    return {"comments": [{"id": comment.id, "body": comment.body, "eventId": comment.eventId, "userId": comment.userId, "username": comment.username} for comment in comments]}