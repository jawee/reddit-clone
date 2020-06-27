import logging

logging.basicConfig(filename='/usr/logs/logging.log', level=logging.DEBUG)

class MyLog:

    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def debug(self, message):
        self.logger.debug(message)

    def error(self, message):
        self.logger.error(message)
