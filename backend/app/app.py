from flask import Flask
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from resources.logging import MyLog

from database.db import initialize_db
from resources.routes import initialize_routes
from resources.errors import errors

app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')
api = Api(app, errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
log = MyLog()



initialize_db(app)
initialize_routes(api)

log.debug("Starting application")
app.run(host="0.0.0.0", port = 5000,debug=True)
