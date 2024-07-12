import type { Sequelize } from 'sequelize'
import { User } from './User'
import { Task } from './Task'

export {
    User,
    Task
}

export function initModels(sequelize: Sequelize) {
    User.initModel(sequelize)
    Task.initModel(sequelize)
    Task.belongsTo(User, {
        as: 'user',
        foreignKey: 'user_id'
    })

    return {
        User,
        Task
    }
}
