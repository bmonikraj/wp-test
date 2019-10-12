import sys
from os.path import dirname as opd, realpath as opr
import os
basedir = opd(opr(__file__))
sys.path.append(basedir)
import logging
logging.basicConfig(filename=os.path.join(basedir, 'main.log'),
                     format='%(asctime)s - %(levelname)s - %(message)s',level=logging.DEBUG)

from waitress import serve
from APIcontroller import app

if __name__ == "__main__":
	logging.info('[main] : Server Starting on %s', sys.argv[1])
	serve(app, listen=sys.argv[1], expose_tracebacks=True)