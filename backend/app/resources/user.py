from flask import Response, request
from database.models import User
from flask_restful import Resource
import json

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, SubredditAlreadyExistsError, InternalServerError, UpdatingSubredditError, DeletingSubredditError, SubredditNotExistsError, UserNotExistsError

from resources.logging import MyLog

log = MyLog()
class UserApi(Resource):
    def get(self, id):
        try:
            user = User.objects.get(id=id)
            resp = json.dumps({ "username": user["username"], "email": user["email"] })
            log.debug(resp)
            return Response(resp, mimetype="application/json", status=200)
        except DoesNotExist:
            raise UserNotExistsError
        except Exception as e:
            log.error(e)
            raise InternalServerError
