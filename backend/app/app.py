from flask import Flask, jsonify, request, Response
from database.db import initialize_db
from database.models import Subreddit

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://mongo/redditclone'
}

initialize_db(app)

@app.route('/subreddits')
def get_subreddits():
    subreddits = Subreddit.objects().to_json()
    return Response(subreddits, mimetype="application/json", status=200)

@app.route('/subreddits/<id>')
def get_movie(id):
    subreddits = Subreddit.objects.get(id=id).to_json()
    return Response(subreddits, mimetype="application/json", status=200)

@app.route('/subreddits', methods=["POST"])
def add_subreddit():
    body = request.get_json()
    subreddit = Subreddit(**body).save()
    id = subreddit.id
    return {'id': str(id)}, 200

@app.route('/subreddits/<int:index>', methods=['PUT'])
def update_subreddit(index):
    body = request.get_json()
    Subreddit.objects.get(id=id).update(**body)
    return '', 200

@app.route('/subreddits/<int:index>', methods=['DELETE'])
def delete_subreddit(index):
    Subreddit.objects.get(id=id).delete()
    return '', 200

app.run(host="0.0.0.0", port = 5000,debug=True)