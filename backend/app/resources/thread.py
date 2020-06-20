from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Subreddit, User, Thread, Comment
from flask_restful import Resource
from flask_restful_swagger import swagger
from bson.objectid import ObjectId
import datetime

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, SubredditAlreadyExistsError, InternalServerError, UpdatingSubredditError, DeletingSubredditError, SubredditNotExistsError, NotExistsError, AlreadyExistsError, UpdatingError, DeletingError

class ThreadsApi(Resource):
    @swagger.operation()
    def get(self):
        threads = Thread.objects().to_json()
        return Response(threads, mimetype="application/json", status=200)

    @jwt_required
    @swagger.operation()
    def post(self):
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            user = User.objects.get(id=user_id)
            subreddit_id = ObjectId(body['subreddit'])
            subreddit = Subreddit.objects.get(id=subreddit_id)
            thread = Thread(**body, created_by=user)
            thread.save()
            user.update(push__threads=thread)
            user.save()
            subreddit.update(push__threads=thread)
            subreddit.save()
            id = thread.id
            return {'id': str(id)}, 200
        except (FieldDoesNotExist, ValidationError) as exc:
            raise SchemaValidationError
        except NotUniqueError:
            raise AlreadyExistsError
        except Exception as e:
            print(e)
            raise InternalServerError

class ThreadApi(Resource):
    @swagger.operation()
    def get(self, id):
        try:
            thread = Thread.objects.get(id=id).to_json()
            return Response(thread, mimetype="application/json", status=200)
        except DoesNotExist:
            raise NotExistsError
        except Exception:
            raise InternalServerError

    @jwt_required
    @swagger.operation()
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            thread = Thread.objects.get(id=id, created_by=user_id)
            body = request.get_json()
            Thread.objects.get(id=id).update(**body)
            return '', 200
        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingError
        except Exception:
            raise InternalServerError

    @jwt_required
    @swagger.operation()
    def delete(self, id):
        try:
            user_id = get_jwt_identity()
            thread = Thread.objects.get(id=id, created_by=user_id)
            thread.delete()
            return '', 200
        except DoesNotExist:
            raise DeletingError
        except Exception:
            raise InternalServerError
