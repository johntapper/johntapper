from flask import Flask, render_template
import requests
import json

app = Flask(__name__)



@app.route("/")
def home():
  return "Hello Wolrd!"

if __name__ == "__main__":
  app.run(debug=True)