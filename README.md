# Public Salaries API

## Overview

An API serving public payroll data for the state of Nebraska.

## Installation

```bash
$ npm install
```

## Launch the database

```bash
$ docker-compose up
```

## Running the app

```bash
# development
$ npm run start

# watch mode (when source code files change, the web app re-launches)
$ npm run start:dev

# The app is now running here: http://localhost:3000/employees/1

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
