from werkzeug.exceptions import HTTPException

class InternalServerError(HTTPException):
    pass

class SchemaValidationError(HTTPException):
    pass

class SubredditAlreadyExistsError(HTTPException):
    pass

class UpdatingSubredditError(HTTPException):
    pass

class DeletingSubredditError(HTTPException):
    pass

class SubredditNotExistsError(HTTPException):
    pass

class EmailAlreadyExistsError(HTTPException):
    pass

class UnauthorizedError(HTTPException):
    pass

class NotExistsError(HTTPException):
    pass

class AlreadyExistsError(HTTPException):
    pass

class UpdatingError(HTTPException):
    pass

class DeletingError(HTTPException):
    pass

class UserNotExistsError(HTTPException):
    pass

errors = {
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    },
    "SchemaValidationError": {
        "message": "Request is missing required fields",
        "status": 400
    },
    "SubredditAlreadyExistsError": {
        "message": "Subreddit with given name already exists",
        "status": 400
    },
    "UpdatingSubredditError": {
        "message": "Updating subreddit added by other is forbidden",
        "status": 403
    },
    "DeletingSubredditError": {
        "message": "Deleting subreddit added by other is forbidden",
        "status": 403
    },
    "SubredditNotExistsError": {
        "message": "Subreddit with given id doesn't exists",
        "status": 400
    },
    "EmailAlreadyExistsError": {
        "message": "User with given email address already exists",
        "status": 400
    },
    "UnauthorizedError": {
        "message": "Invalid username or password",
        "status": 401
    },
    "NotExistsError": {
        "message": "Entity with given id doesn't exists",
        "status": 400
    },
    "AlreadyExistsError": {
        "message": "Entity with given name already exists",
        "status": 400
    },
    "UpdatingError": {
        "message": "Updating entity added by other is forbidden",
        "status": 403
    },
    "DeletingError": {
        "message": "Deleting subreddit added by other is forbidden",
        "status": 403
    },
    "UserNotExistsError": {
        "message": "User with given id doesn't exists",
        "status": 400
    },
}
