import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
    database: 'taskManagement',
    dialect: 'postgres',
    username: 'user',
    password: 'password',
    host: 'postgres',
    define:{
        underscored:true
    },
    timezone: '+03:30',
});

export { sequelize };
