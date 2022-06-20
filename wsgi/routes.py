from flask import Blueprint

bp = Blueprint("wsgi", __name__, url_prefix="/wsgi")

@bp.route("/test",methods=['GET'])
def home():
    return "done"