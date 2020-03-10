## Postgres with Docker

1. `docker run --name database -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres`
2. Create a db with gobarber name

## Migrations

1. Running `yarn sequelize db:migrate`
2. Running `yarn sequelize db:migrate:undo` for delete last migration
