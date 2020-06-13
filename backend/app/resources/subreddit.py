from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Subreddit, User
from flask_restful import Resource

class SubredditsApi(Resource):
    @jwt_required
    def get(self):
        subreddits = Subreddit.objects().to_json()
        return Response(subreddits, mimetype="application/json", status=200)

    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        body = request.get_json()
        user = User.objects.get(id=user_id)
        subreddit = Subreddit(**body, added_by=user)
        subreddit.save()
        user.update(push__subreddits=subreddit)
        user.save()
        id = subreddit.id
        return {'id': str(id)}, 200

class SubredditApi(Resource):
    @jwt_required
    def get(self, id):
        subreddits = Subreddit.objects.get(id=id).to_json()
        return Response(subreddits, mimetype="application/json", status=200)

    @jwt_required
    def put(self, id):
        user_id = get_jwt_identity()
        subreddit = Subreddit.objects.get(id=id, added_by=user_id)
        body = request.get_json()
        Subreddit.objects.get(id=id).update(**body)
        return '', 200

    @jwt_required
    def delete(self, id):
        user_id = get_jwt_identity()
        subreddit = Subreddit.objects.get(id=id, added_by=user_id)
        subreddit.delete()
        return '', 200
