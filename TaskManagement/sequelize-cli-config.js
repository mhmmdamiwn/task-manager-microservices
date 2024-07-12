const path = require('path');

async function loadDatabase() {
    const { sequelize } = await import('./src/app/Ship/Configs/Database');
    return sequelize;
}

module.exports = {
    development: async () => {
        const dbConfig = await loadDatabase();
        return {
            ...dbConfig.config,
            modelsDir: path.resolve(__dirname, '../src/app/Containers/TasksManagement/Models'),
            migrationsDir: path.resolve(__dirname, '../src/app/Containers/TasksManagement/Migrations'),
        };
    },
};
