from .subreddit import SubredditsApi, SubredditApi

def initialize_routes(api):
 api.add_resource(SubredditsApi, '/api/subreddits')
 api.add_resource(SubredditApi, '/api/subreddits/<id>')