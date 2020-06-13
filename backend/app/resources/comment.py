from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Subreddit, User, Thread, Comment
from flask_restful import Resource
from bson.objectid import ObjectId
import datetime

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, SubredditAlreadyExistsError, InternalServerError, UpdatingSubredditError, DeletingSubredditError, SubredditNotExistsError, NotExistsError, AlreadyExistsError, UpdatingError, DeletingError

class CommentsApi(Resource):
    def get(self):
        comments = Comment.objects().to_json()
        return Response(comments, mimetype="application/json", status=200)

    @jwt_required
    def post(self):
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            user = User.objects.get(id=user_id)
            thread_id = ObjectId(body['thread'])
            thread = Thread.objects.get(id=thread_id)
            comment = Comment(**body, created_by=user)
            comment.save()
            user.update(push__comments=comment)
            user.save()
            thread.update(push__comments=comment)
            thread.save()
            id = thread.id
            return {'id': str(id)}, 200
        except (FieldDoesNotExist, ValidationError) as exc:
            print(exc)
            raise SchemaValidationError
        except NotUniqueError:
            raise AlreadyExistsError
        except Exception as e:
            print(e)
            raise InternalServerError

class CommentApi(Resource):
    def get(self, id):
        try:
            comment = Comment.objects.get(id=id).to_json()
            return Response(comment, mimetype="application/json", status=200)
        except DoesNotExist:
            raise NotExistsError
        except Exception:
            raise InternalServerError

    @jwt_required
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            comment = Comment.objects.get(id=id, created_by=user_id)
            body = request.get_json()
            Comment.objects.get(id=id).update(**body)
            return '', 200
        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingError
        except Exception:
            raise InternalServerError

    @jwt_required
    def delete(self, id):
        try:
            user_id = get_jwt_identity()
            comment = Comment.objects.get(id=id, created_by=user_id)
            comment.delete()
            return '', 200
        except DoesNotExist:
            raise DeletingError
        except Exception:
            raise InternalServerError
