import {
    Association,
    CreationOptional,
    DataTypes,
    InferCreationAttributes,
    InferAttributes,
    NonAttribute,
    Sequelize
} from 'sequelize'
import type { User } from './User'
import {BaseModel} from "../../../Ship/BaseModel";

type TaskAssociations = 'user'

export class Task extends BaseModel<
    InferAttributes<Task, {omit: TaskAssociations}>,
    InferCreationAttributes<Task, {omit: TaskAssociations}>
> {
    declare id: CreationOptional<number>
    declare title: string
    declare description: string
    declare status: 'pending' | 'in-progress' | 'completed'
    declare dueDate: CreationOptional<Date>
    declare userId: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    // Task belongsTo User
    declare user?: NonAttribute<User>

    declare static associations: {
        user: Association<Task, User>
    }

    static initModel(sequelize: Sequelize): typeof Task {
        Task.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
                allowNull: false,
                defaultValue: 'pending'
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: false,
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

        return Task
    }

}
