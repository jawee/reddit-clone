from .subreddit import SubredditsApi, SubredditApi
from .thread import ThreadApi, ThreadsApi
from .auth import SignupApi, LoginApi
from .comment import CommentApi, CommentsApi
from .subredditByUrl import SubredditByUrlApi
from .user import UserApi

def initialize_routes(api):
    api.add_resource(SubredditsApi, '/api/subreddits')
    api.add_resource(SubredditApi, '/api/subreddits/<id>')
    api.add_resource(SignupApi, '/api/auth/signup')
    api.add_resource(LoginApi, '/api/auth/login')
    api.add_resource(ThreadsApi, '/api/threads')
    api.add_resource(ThreadApi, '/api/threads/<id>')
    api.add_resource(CommentsApi, '/api/comments')
    api.add_resource(CommentApi, '/api/comments/<id>')
    api.add_resource(SubredditByUrlApi, '/api/subredditbyurl/<url>')
    api.add_resource(UserApi, '/api/users/<id>')
