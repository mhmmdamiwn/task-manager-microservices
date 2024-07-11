import {
    Association,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
    CreationOptional,
    DataTypes,
    InferCreationAttributes,
    InferAttributes,
    Model,
    NonAttribute,
    Sequelize
} from 'sequelize'
import type { Role } from './Role'
import type { User } from './User'

type UserRoleAssociations = 'role' | 'user'

export class UserRole extends Model<
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
    declare getRole: BelongsToGetAssociationMixin<Role>
    declare setRole: BelongsToSetAssociationMixin<Role, number>
    declare createRole: BelongsToCreateAssociationMixin<Role>

    // UserRole belongsTo User
    declare user?: NonAttribute<User>
    declare getUser: BelongsToGetAssociationMixin<User>
    declare setUser: BelongsToSetAssociationMixin<User, number>
    declare createUser: BelongsToCreateAssociationMixin<User>

    declare static associations: {
        role: Association<UserRole, Role>,
        user: Association<UserRole, User>
    }

    static initModel(sequelize: Sequelize): typeof UserRole {
        UserRole.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
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
