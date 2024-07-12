import {
    Association,
    CreationOptional,
    DataTypes,
    InferCreationAttributes,
    InferAttributes,
    NonAttribute,
    Sequelize
} from 'sequelize'
import type { Role } from './Role'
import type { User } from './User'
import {BaseModel} from "../../../Ship/BaseModel";

type UserRoleAssociations = 'role' | 'user'

export class UserRole extends BaseModel<
    InferAttributes<UserRole, {omit: UserRoleAssociations}>,
    InferCreationAttributes<UserRole, {omit: UserRoleAssociations}>
> {
    declare id: CreationOptional<number>
    declare roleId: number
    declare userId: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    // UserRole belongsTo Role
    declare role?: NonAttribute<Role>

    // UserRole belongsTo User
    declare user?: NonAttribute<User>

    declare static associations: {
        role: Association<UserRole, Role>,
        user: Association<UserRole, User>
    }

    static initModel(sequelize: Sequelize): typeof UserRole {
        UserRole.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        }, {
            sequelize
        })

        return UserRole
    }
}
