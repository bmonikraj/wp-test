import sys
from os.path import dirname as opd, realpath as opr
import os
basedir = opd(opr(__file__))
sys.path.append(basedir)
import logging
logging.basicConfig(filename=os.path.join(basedir, 'main.log'),
					 format='%(asctime)s - %(levelname)s - %(message)s',level=logging.DEBUG)

from flask import Flask, request, render_template
import json
from APIservice import Service

app = Flask(__name__,
		static_folder=os.path.join(basedir, 'build/static'), 
    	template_folder=os.path.join(basedir, 'build'))

@app.route("/", methods=['GET'])
def uiServe():
	return render_template('index.html')

@app.route("/login-email", methods=['POST'])
def loginEmail():
	data = {"status" : "failure"}
	result = Service.emailLogin(request.form["email"], request.form["password"])
	if result:
		data = { "status" : "success" }
	else:
		data = { "status" : "failure" }			
	response = app.response_class(
				response = json.dumps(data),
				status = 200,
				mimetype = 'application/json'
			)
	return response

@app.route("/login-phone", methods=['POST'])
def loginPhone():
	data = {"status" : "failure"}
	result = Service.phoneLogin(request.form["phone"])
	if result:
		data = { "status" : "success", "phone" : request.form["phone"] }
	else:
		data = { "status" : "failure" }			
	response = app.response_class(
				response = json.dumps(data),
				status = 200,
				mimetype = 'application/json'
			)
	return response

@app.route("/otp-verify", methods=['POST'])
def otpVerify():
	data = {"status" : "failure"}
	result = Service.otpVerification(request.form["phone"], request.form["otp"])
	if result:
		data = { "status" : "success"}
	else:
		data = { "status" : "failure" }			
	response = app.response_class(
				response = json.dumps(data),
				status = 200,
				mimetype = 'application/json'
			)
	return response
