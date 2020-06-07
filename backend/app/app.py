from flask import Flask, jsonify, request

app = Flask(__name__)

subreddits = [
    {
        "name": "Formula 1",
        "url": "formula1"
    },
    {
        "name": "IndyCar",
        "url": "indycar"
    }
]

@app.route('/')
def get_subreddits():
    return jsonify(subreddits)

@app.route('/subreddits', methods=["POST"])
def add_subreddit():
    subreddit = request.get_json()
    subreddits.append(subreddit)
    return {'id': len(subreddits)}, 200

@app.route('/subreddits/<int:index>', methods=['PUT'])
def update_subreddit(index):
    subreddit = request.get_json()
    subreddits[index] = subreddit
    return jsonify(subreddits[index]), 200

@app.route('/subreddits/<int:index>', methods=['DELETE'])
def delete_subreddit(index):
    subreddits.pop(index)
    return 'None', 200

app.run(host="0.0.0.0", port = 5000,debug=True)