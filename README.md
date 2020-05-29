# Ejemplo TicketApp usando Docker, Django 2.2 + Django Rest Framework + Simple JWT, Sqlite y Angular 9.x
Esta es una instalación [Docker][] para una SPA Angular con Rest Api en Django.

- Proyecto Backend [Django][] Dependencias de [Python][] en el archivo requirements.txt
- Proyecto Frontend [Angular][] `/static/frontend/` y dependencias en el archivo package.json
- 
## Requisitos 
Necesitas tener instalado [Docker][] y [Docker-Compose][].


## Build
`docker-compose build`.

## Migrar base de datos
`docker-compose run --rm api python3 /srv/manage.py migrate`.

## Cargar datos demo
`python manage.py syncdb`
`docker-compose run --rm api python3 /srv/manage.py loaddata ./srv/fixtures/initial_data.json`

## Crear usuario administrador
`docker-compose run --rm api python3 /srv/manage.py createsuperuser`

## Run
`docker-compose up`.

## Opcional
- Para desarrollo Frontend necesitarás [Nodejs][] y también [Angular][] `npm install -g @angular/cli`

[Angular]: https://angular.io/
[Docker]: https://www.docker.com/
[Django]: https://www.djangoproject.com/
[Python]: https://www.python.org/
[Docker-Compose]: https://docs.docker.com/compose/
