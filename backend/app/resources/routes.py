from .subreddit import SubredditsApi, SubredditApi
from .thread import ThreadApi, ThreadsApi
from .auth import SignupApi, LoginApi

def initialize_routes(api):
    api.add_resource(SubredditsApi, '/api/subreddits')
    api.add_resource(SubredditApi, '/api/subreddits/<id>')
    api.add_resource(SignupApi, '/api/auth/signup')
    api.add_resource(LoginApi, '/api/auth/login')
    api.add_resource(ThreadsApi, '/api/threads')
    api.add_resource(ThreadApi, '/api/thread/<id>')
 
