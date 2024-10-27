# Vee

Simple backend for the Vee grants technical assessment. Uses the following:

* NestJs
* GraphQL
* Drizzle ORM
* Postgres
* Docker

### Running

```
docker-compose up
```

### Testing

Ensure that the database is running:
```
docker-compose up -d db
```

Then make sure you have run the required migrations:
```
yarn db:migrate
```

Then run tests (currently only has e2e):
```
yarn test:e2e
```