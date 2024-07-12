import {
    CreationOptional,
    DataTypes,
    InferCreationAttributes,
    InferAttributes,
    Sequelize
} from 'sequelize'
import {BaseModel} from "../../../Ship/BaseModel";

export class User extends BaseModel<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<number>
    declare email: string
    declare password: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    static initModel(sequelize: Sequelize): typeof User {
        User.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
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

        return User
    }
}
