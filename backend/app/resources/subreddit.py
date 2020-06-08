from flask import Response, request
from database.models import Subreddit
from flask_restful import Resource

class SubredditsApi(Resource):
    def get(self):
        subreddits = Subreddit.objects().to_json()
        return Response(subreddits, mimetype="application/json", status=200)

    def post(self):
        body = request.get_json()
        subreddit = Subreddit(**body).save()
        id = subreddit.id
        return {'id': str(id)}, 200

class SubredditApi(Resource):
    def get(self, id):
        subreddits = Subreddit.objects.get(id=id).to_json()
        return Response(subreddits, mimetype="application/json", status=200)

    def put(self, id):
        body = request.get_json()
        Subreddit.objects.get(id=id).update(**body)
        return '', 200

    def delete(self, id):
        Subreddit.objects.get(id=id).delete()
        return '', 200