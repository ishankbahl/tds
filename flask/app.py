#our web app framework!

#you could also generate a skeleton from scratch via
#http://flask-appbuilder.readthedocs.io/en/latest/installation.html

#Generating HTML from within Python is not fun, and actually pretty cumbersome because you have to do the
#HTML escaping on your own to keep the application secure. Because of that Flask configures the Jinja2 template engine
#for you automatically.
#requests are objects that flask handles (get set post, etc)
from flask import Flask, render_template,request
#for matrix math
import numpy as np
#for importing our keras model
import keras.models
from keras.preprocessing import sequence
from keras.preprocessing.text import one_hot
from keras.preprocessing.sequence import pad_sequences

#for regular expressions, saves time dealing with string data
import re

#system level operations (like loading files)
import sys
#for reading operating system data
import os
#tell our app where our saved model is
sys.path.append(os.path.abspath("./model"))
from load import *
#initalize our flask app
app = Flask(__name__)
#global vars for easy reusability
global model, graph
#initialize these variables
model, graph = init()

#decoding an image from base64 into raw representation
def encodeText(text):
	vocab_size = 500
	encoded_docs = one_hot(text, vocab_size)
	return encoded_docs

def padText(text):
	max_length = 30
	padded_docs = pad_sequences(text, maxlen=max_length, padding='post')
	return padded_docs

@app.route('/')
def index():
	#initModel()
	print("init")
	#render out pre-built HTML file right on the index page
	return render_template("index.html")

@app.route('/predict/',methods=['GET','POST'])
def predict():
	#whenever the predict method is called, we're going
	#to input the user drawn character as an image into the model
	#perform inference, and return the classification
	#get the raw data format of the image
	textData = request.get_data()
	#encode it into a suitable format
	x = encodeText(textData)
	x = padText(x)

	with graph.as_default():
		#perform the prediction
		out = model.predict(x)
		print(out)
		print(np.argmax(out,axis=1))
		#convert the response to a string
		response = np.array_str(np.argmax(out,axis=1))
		return response


if __name__ == "__main__":
	#decide what port to run the app in
	port = int(os.environ.get('PORT', 5600))
	#run the app locally on the givn port
	app.run(host='10.200.238.175', debug=True, port=port)
	#optional if we want to run in debugging mode
	#app.run(debug=True)
