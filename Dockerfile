FROM python:3.7.4-alpine3.10 
WORKDIR /root
ADD API /root/API
RUN pip install pipenv \
    && cd API \
    && pipenv install --deploy --ignore-pipfile
WORKDIR /root/API
CMD ["pipenv", "run", "python", "main.py", "0.0.0.0:80"]
