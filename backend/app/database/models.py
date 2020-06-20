from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_restful_swagger import swagger
import datetime

@swagger.model
class Subreddit(db.Document):
    name = db.StringField(required=True, unique=True)
    url = db.StringField(required=True, unique=True)
    created_by = db.ReferenceField('User')
    threads = db.SortedListField(db.ReferenceField('Thread'))

@swagger.model
class User(db.Document):
    email = db.EmailField(required=False, unique=True)
    username = db.StringField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)
    subreddits = db.SortedListField(db.ReferenceField('Subreddit'))
    threads = db.SortedListField(db.ReferenceField('Thread'))
    comments = db.SortedListField(db.ReferenceField('Comment'))

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)


@swagger.model
class Thread(db.Document):
    title = db.StringField(required=True)
    content = db.StringField(required=True)
    created_by = db.ReferenceField('User')
    created_at = db.DateTimeField(default=datetime.datetime.now)
    comments = db.SortedListField(db.ReferenceField('Comment'))
    subreddit = db.ReferenceField('Subreddit')

@swagger.model
class Comment(db.Document):
    content = db.StringField(required=True)
    created_by = db.ReferenceField('User')
    created_at = db.DateTimeField(default=datetime.datetime.now)
    thread = db.ReferenceField('Thread')

