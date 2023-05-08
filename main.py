from flask import *
import datetime
import requests
import os

app = Flask(__name__)

@app.route('/')
def index():
    """ Home page
    """
    return render_template('index.html', gas_limit=80000, fee=2000, node_url='http://127.0.0.1:26659')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)
