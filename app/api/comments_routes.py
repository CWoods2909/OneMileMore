from flask import Blueprint, request
from flask_login import current_user
from app.models import Comment, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

    
@comment_routes.route('/', methods=['POST'])
def post_comments():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            body= form.data['body'],
            userId = current_user.id,
            eventId = request.get_json()['eventId']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    elif form.errors:
        return {'errors': form.errors}, 401
    
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()

@comment_routes.route('/<int:id>', methods=['PUT'])
def edit_comment(id):
    comment = Comment.query.get(id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        comment.body= form.data['body'],
        userId = current_user.id,
        eventId = request.get_json()['eventId']
        
        db.session.commit()
        return comment.to_dict()
    elif form.errors:
        return {'errors': form.errors}, 401