from flask import Response, request
from database.models import Subreddit, User, Thread, Comment
from flask_restful import Resource

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, SubredditAlreadyExistsError, InternalServerError, UpdatingSubredditError, DeletingSubredditError, SubredditNotExistsError

class SubredditByUrlApi(Resource):
    def get(self, url):
        try:
            subreddit = Subreddit.objects.get(url=url).to_json()
            return Response(subreddit, mimetype="application/json", status=200)
        except DoesNotExist:
            raise SubredditNotExistsError
        except Exception:
            raise InternalServerError

