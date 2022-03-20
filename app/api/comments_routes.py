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

@comment_routes.route('/<int:id>', methods=['POST'])
def post_comments(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            body= form.data['body'],
            userId = current_user.id,
            eventId=id
        )
        db.session.add(comment)
        db.session.commit()
        newComment = Comment.query.filter(comment.id == Comment.id).join(User, User.id == Comment.userId).add_columns(Comment.id, Comment.body, Comment.eventId, Comment.userId, User.username).first()
        
        return {"id": newComment.id, "body":newComment.body, "eventId": newComment.eventId, "userId": newComment.userId, "username": newComment.username}
    elif form.errors:
        return {'errors': form.errors}, 401