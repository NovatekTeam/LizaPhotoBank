
from gevent.pywsgi import WSGIServer
from flask import Flask
app = Flask(__name__)

from routes import bp

app.register_blueprint(bp)

server = WSGIServer(('0.0.0.0', 5000), app)
server.serve_forever()
