import os
import re

from functools import wraps
from flask import Flask, jsonify, redirect, render_template, request, url_for, session
from urllib.parse import urlencode

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/autocomplete')
def autocomplete():
    return render_template("autocomplete.html")

@app.route('/moviecards')
def moviecards():
    return render_template("moviecards.html")

@app.route('/getstates')
def states():
    keyword = request.args.get('k')
    states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

    if not keyword:
        return jsonify([])
    else:
        p = re.compile(keyword, re.I)
        ret_states = [ state for state in states if p.match(state) ]
        return jsonify(ret_states)

if __name__ == '__main__':
    pass
