from flask import Flask
from database.db import initialize_db
from flask_restful import Api
from resources.routes import initialize_routes

app = Flask(__name__)
api = Api(app)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://mongo/redditclone'
}

initialize_db(app)
initialize_routes(api)

app.run(host="0.0.0.0", port = 5000,debug=True)