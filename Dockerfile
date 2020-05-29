FROM python:3.7

ENV PYTHONUNBUFFERED 1

WORKDIR /srv

ADD ./requirements.txt /srv/requirements.txt
RUN pip install --upgrade pip
RUN pip install  --no-cache-dir -r requirements.txt

# RUN python3 manage.py makemigrations
# RUN python3 manage.py migrate

EXPOSE 8000

# CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000" ]