import type { Sequelize } from 'sequelize'
import { User } from './User'
import { Role } from './Role'
import { UserRole } from './UserRole'

export {
    User,
    Role,
    UserRole
}

export function initModels(sequelize: Sequelize) {
    User.initModel(sequelize)
    Role.initModel(sequelize)
    UserRole.initModel(sequelize)

    UserRole.belongsTo(Role, {
        as: 'role',
        foreignKey: 'role_id'
    })
    UserRole.belongsTo(User, {
        as: 'user',
        foreignKey: 'user_id'
    })

    return {
        User,
        Role,
        UserRole
    }
}
