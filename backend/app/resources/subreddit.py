from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Subreddit, User, Thread, Comment
from flask_restful import Resource

from resources.logging import MyLog

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, SubredditAlreadyExistsError, InternalServerError, UpdatingSubredditError, DeletingSubredditError, SubredditNotExistsError

log = MyLog()
class SubredditsApi(Resource):
    def get(self):
        subreddits = Subreddit.objects().to_json()
        return Response(subreddits, mimetype="application/json", status=200)

    @jwt_required
    def post(self):
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            user = User.objects.get(id=user_id)
            subreddit = Subreddit(**body, created_by=user)
            subreddit["url"] = getUrlFromName(subreddit["name"])
            subreddit.save()
            user.update(push__subreddits=subreddit)
            user.save()
            id = subreddit.id
            return {'id': str(id)}, 200
        except (FieldDoesNotExist, ValidationError):
            raise SchemaValidationError
        except NotUniqueError:
            raise SubredditAlreadyExistsError
        except Exception as e:
            raise InternalServerError

def getUrlFromName(name):
    log.debug(name)
    url = name.replace(" ", "-")
    return url

class SubredditApi(Resource):
    def get(self, id):
        try:
            subreddits = Subreddit.objects.get(id=id).to_json()
            return Response(subreddits, mimetype="application/json", status=200)
        except DoesNotExist:
            raise SubredditNotExistsError
        except Exception as e:
            raise InternalServerError

    @jwt_required
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            subreddit = Subreddit.objects.get(id=id, created_by=user_id)
            body = request.get_json()
            Subreddit.objects.get(id=id).update(**body)
            return '', 200
        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingSubredditError
        except Exception:
            raise InternalServerError

    @jwt_required
    def delete(self, id):
        try:
            user_id = get_jwt_identity()
            subreddit = Subreddit.objects.get(id=id, created_by=user_id)
            subreddit.delete()
            return '', 200
        except DoesNotExist:
            raise DeletingSubredditError
        except Exception:
            raise InternalServerError
