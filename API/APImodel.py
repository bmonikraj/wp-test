import sys
from os.path import dirname as opd, realpath as opr
import os
basedir = opd(opr(__file__))
sys.path.append(basedir)
import logging
logging.basicConfig(filename=os.path.join(basedir, 'main.log'),
                     format='%(asctime)s - %(levelname)s - %(message)s',level=logging.DEBUG)

import mongoengine

class User(mongoengine.Document):
	phone_no = mongoengine.StringField(db_field="phoneno", default="", required=True, unique=True)
	email_id = mongoengine.StringField(db_field="emailid", default="", required=True, unique=True)
	password = mongoengine.StringField(db_field="password", default="", required=True, unique=False)
	otp = mongoengine.StringField(db_field="otp", default="", required=False, unique=False)
	otp_timestamp = mongoengine.StringField(db_field="otptimestamp",default="", required=False, unique=False)

	meta = {'collection' : 'user'}