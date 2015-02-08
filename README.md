# mean-bastard

a small MEAN seed project

## Prerequisites

* mongodb
* node
* bower

## Structure

    .
    ├── bin
    │   ├── db
    │   ├── load_fixtures
    │   └── www
    ├── client
    │   ├── controllers
    │   ├── img
    │   ├── styles
    │   └── views
    ├── config
    │   ├── client_config.json
    │   ├── db_config.json
    │   └── server_config.json
    ├── data
    │   ├── db
    │   └── fixtures
    ├── server
    │   ├── model
    │   └── routes
    ├── server.js
    └── test
        ├── client
        ├── feature
        └── server


## Build

    $ npm install
    $ bower

## Configure

* `db_config.json`
* `server_config.json`
* `client_config.json`

## Start

### Start DB

Optional: you may already have started mongodb

    $ bin/db

### Start Express

    $ bin/www

### Browse to localhost:3000

#### MacOs

    $ open http://127.0.0.1:3000

## Test

### Load fixtures

See `data/fixtures/README.md`

    $ bin/load_fixtures
