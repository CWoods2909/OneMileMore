from flask import Blueprint, request
from flask_login import current_user
from app.models import Comment, User, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

    
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
        
        return {"id": newComment.id, "body": newComment.body, "eventId": newComment.eventId, "userId": newComment.userId, "username": newComment.username}
    elif form.errors:
        return {'errors': form.errors}, 401
    
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()