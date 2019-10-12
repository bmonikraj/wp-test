import sys
from os.path import dirname as opd, realpath as opr
import os
basedir = opd(opr(__file__))
sys.path.append(basedir)
import logging
logging.basicConfig(filename=os.path.join(basedir, 'main.log'),
					 format='%(asctime)s - %(levelname)s - %(message)s',level=logging.DEBUG)

from mongoengine import connect, disconnect
import random
import time
import json
import requests

from APImodel import User

DATABASE = "testtbr"
DBURL = "mongodb+srv://wp-test:wp-test-10@fastech-fashions-m0-clust-1-mcax9.mongodb.net/?retryWrites=true&w=majority"
SMSURL = "https://api.msg91.com/api/sendhttp.php?authkey=234291A7xF5QOTYtD5da0ee2d&route=4&sender=APITWP&country=91"

class Service:

	@staticmethod
	def emailLogin(email, password):

		"""
			No password hashing is done since no registration method is to be done
			Thus without hashing testing becomes easier (like insertion)
		"""

		alias_name = "_EMAILLOGIN_"+str(random.randint(100000000,999999999))
		try:
			connect(db=DATABASE, alias="default", host=DBURL)
			connect(db=DATABASE, alias=alias_name, host=DBURL)
			print("Connected")

			if email == "" or password == "":
				raise Exception("Email or password can't be empty")

			user = User.objects.get(email_id = email, password = password)

			disconnect(alias=alias_name)
			disconnect(alias="default")
		except Exception as e:
			logging.error("[APIService.emailLogin] - Login with Email failed for %s : %s", email, e)
			return False
			
		logging.info("[APIService.emailLogin] - Login with Email executed for %s : %s", email, 'Success')
		return True

	@staticmethod
	def phoneLogin(phone):

		alias_name = "_PHONELOGIN_"+str(random.randint(100000000,999999999))
		try:
			connect(db=DATABASE, alias="default", host=DBURL)
			connect(db=DATABASE, alias=alias_name, host=DBURL)

			if phone == "":
				raise Exception("Phone number can't be empty")

			otpString = str(random.randint(100000,999999))
			user = User.objects.get(phone_no = phone).update(otp_timestamp = str(int(time.time())), otp = otpString)
			if not Service.sendSMS(phone, otpString):
				raise Exception("SMS not sent")
			disconnect(alias=alias_name)
			disconnect(alias="default")
		except Exception as e:
			logging.error("[APIService.phoneLogin] - Login with Phone failed for %s : %s", phone, e)
			return False
			
		logging.info("[APIService.phoneLogin] - Login with Phone executed for %s : %s", phone, 'Success')
		return True

	@staticmethod
	def otpVerification(phone, otp):

		alias_name = "_PHONELOGIN_"+str(random.randint(100000000,999999999))
		try:
			connect(db=DATABASE, alias="default", host=DBURL)
			connect(db=DATABASE, alias=alias_name, host=DBURL)

			if phone == "" or otp == "":
				raise Exception("Phone number or OTP can't be empty")

			user = User.objects.get(phone_no = phone, otp = otp)
			user = user.to_mongo().to_dict()
			if int(user['otptimestamp']) + 600 < int(time.time()):
				raise Exception("OTP Expired")

			disconnect(alias=alias_name)
			disconnect(alias="default")
		except Exception as e:
			logging.error("[APIService.otpVerification] - OTP Verification Phone failed for %s : %s", phone, e)
			return False
			
		logging.info("[APIService.otpVerification] - OTP Verification for %s : %s", phone, 'Success')
		return True

	@staticmethod
	def sendSMS(phone, otpString):
		try:
			_SMSURL = SMSURL + "&mobiles=91{0}&message={1}%20is%20OTP%20for%20WP-API,%20valid%20for 10%20mins".format(phone, otpString)
			r = requests.get(_SMSURL)
		except Exception as e:
			logging.error("[APIService.sendSMS] - OTP Sending Phone failed for %s : %s", phone, e)
			return False			
		logging.info("[APIService.sendSMS] - OTP Sent for %s : %s", phone, 'Success')
		return True

