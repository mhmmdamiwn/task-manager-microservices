#!/usr/bin/env bash
# Wait for the postgres service to be ready
./wait-for-it.sh postgres:5432 --timeout=60 --strict -- echo "Postgres is up - executing command"
./wait-for-it.sh rabbitmq:5672 --timeout=60 --strict -- echo "Rabbit is up - executing command"

# Run migrations
npx sequelize-cli db:migrate --migrations-path src/app/Containers/TasksManagement/Migrations/ --config src/app/Ship/Configs/Sequelize/config.json

# Start the application
npm run start
