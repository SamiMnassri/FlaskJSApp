#!flask/bin/python

import sys
from flask import Flask, render_template, request, redirect, Response
import random, json

app = Flask(__name__)


#################
# INDEX PAGE
#################
@app.route('/')
def index_function():
	# serve index template (and provide default values for the form)
	return render_template('index.html', default_name='John Doe', default_age = 99, default_country='Wonderland')
	


#################
# TEXT RECEIVER
#################
@app.route('/text_receiver', methods = ['POST'])
def test_function():

	# 1. retrieving data sent from index.html 
	name = str(request.data, 'utf-8')

	# 2. processing data 
	# 3. generate response
	message = 'Hello, ' + name + ' !'

	# 4. send back the response
	return message



#################
# JSON RECEIVER
#################
@app.route('/json_receiver', methods = ['POST'])
def receiver_function():

	# 1. retrieving data sent from index.html
	data = request.get_json()
	name = str(data['name'])
	age = int(data['age'])
	country = str(data['country'])


	# 2. processing data 
	# determine if Minor or Adult based on Age
	if (age>=18):
		status = 'Adult'
	else:
		status = 'Minor'

	# 3. generate response
	response = {'name':name, 'status':status}
	response_text = json.dumps(response)


	# 4. send back the response
	return Response(response_text, mimetype='application/json')




# START APPLICATION
if __name__ == '__main__':
	# run!
	app.run()