# Ejemplo TicketApp usando Docker, Django 2.2 + Django Rest Framework + Simple JWT, Sqlite y Angular 9.x
Esta es una instalación [Docker][] para una SPA Angular con Rest Api en Django.

- Proyecto Backend [Django][] `/` Dependencias de [Python][] en el archivo requirements.txt
- Proyecto Frontend [Angular][] `/static/frontend/` y dependencias en el archivo package.json

## Requisitos 
Necesitas tener instalado [Docker][] y [Docker-Compose][].


## Build
`docker-compose build`.

## Migrar base de datos
`docker-compose run --rm api python3 /srv/manage.py migrate`.

## Cargar datos demo
`docker-compose run --rm api python3 /srv/manage.py loaddata ./srv/fixtures/initial_data.json`

## Crear usuario administrador
`docker-compose run --rm api python3 /srv/manage.py createsuperuser`

## Run
`docker-compose up`.

## Opcional

- Para desarrollo Backend puedes hacerlo codificando directo o corriendo sobre el Docker, de lo contrario necesitarás instalar [Python][]
  - En la ruta base del proyecto `/`
  - `pip install --upgrade pip`
  - `pip install  --no-cache-dir -r requirements.txt`
  - `python3 manage.py runserver 0.0.0.0:8000`
 
- Para desarrollo Frontend necesitarás [NodeJS][] y también [Angular][] `npm install -g @angular/cli`
  - `cd /static/frontend/`
  - `npm install`
  - `ng serve`

[Angular]: https://angular.io/
[Django]: https://www.djangoproject.com/
[Docker]: https://www.docker.com/
[Docker-Compose]: https://docs.docker.com/compose/
[NodeJS]: https://nodejs.org/
[Python]: https://www.python.org/
