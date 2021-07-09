An API serving public payroll data for the state of Nebraska.

## Install the app

```bash
$ npm install
```

## Launch the database

```bash
$ docker-compose up
```

## Run the app

```bash
# development
$ npm run start

# watch mode (when source code files change, the web app re-launches)
$ npm run start:dev

# The app is now running here: http://localhost:3000/employees/1

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# run one specific test
$ npx jest --testNamePattern='GET /employees/1 gets employee with name masked'
```

## Connect to DB

```
$ PGPASSWORD=password psql --username=postgres
postgres=# select count(*) from agency;
     3
postgres=# select count(*) from employee;
 17619
```
