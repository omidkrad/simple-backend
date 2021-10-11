<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This repo demonstrates simple REST API with [NestJS](https://github.com/nestjs/nest) and [Mikro-ORM](https://mikro-orm.io), using PostgreSQL in Docker.

There are two entities defined, `Product` and `Review` with a one-to-many relationship. Only CRUD operations for `Product` are implemented.

Please follow these steps for deployment.

## Deployment
You will need to have the following installed:
- NodeJS + npm
- Docker
- [Postman app](https://www.postman.com/downloads)

> This was tested on Node v16.1.0, npm 7.11.2, Docker 20.10.8.

Run docker compose to start PosgreSQL and pgAdmin containers.
```
$ docker compose up -d
```

To open pgAdmin dashboard, open the browser at: `http://localhost:5050/`. It will take a few minutes for the service to load.

When pgAdmin is open, it may ask to set a master password. Enter for example: `admin`.

Click on "Add New Server".

In the "Create - Server" dialog, under **General** tab enter:
- Name: `my-server`

Under the **Connection** tab enter:
- Host: `db`
- Port: `5432`
- Username: `postgres`
- Password: `changeme`

Then click on "Save". `my-server` should appear on the left pane under **Servers**. Under `my-server` -> `Databases` there should be an `online-store` database.

In the terminal change directory to the repo, then install modules:
```
npm install
```

Next, run migrations to create tables in the database.
```
npx mikro-orm migration:up
```

After the migration is completed successfully, 3 database tables will be created under `online-store` -> `Schemas` -> `public` -> `Tables`
- mikro-orm-migrations
- product
- review

## Running the app

Run the app in any of these modes:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Trying the end-points

Open Postman app and import the collection file: `postman/Product.postman_collection.json`.

It will add the `Product` collection with the following HTTP request items:
- POST Create Product 1
- POST Create Product 2
- GET Get Products
- GET Get Product by ID
- PATCH Edit Product
- DEL Remove Product by ID

## Issues:
This is a very basic CRUD implementation and is in no means a complete solution. There are several things that are missing or could be improved.

- CRUD for product review entities is not implemented
- Database provision could be automated further
- Primary Keys are not efficient randomized Object ID types
- Filtering and pagination not implemented
- Tests not implemented
- API discovery not implemented
- etc.
