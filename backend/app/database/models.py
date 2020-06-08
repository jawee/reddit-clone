from .db import db

class Subreddit(db.Document):
    name = db.StringField(required=True, unique=True)
    url = db.StringField(required=True, unique=True)