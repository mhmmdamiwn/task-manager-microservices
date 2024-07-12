import {
    CreationOptional,
    DataTypes,
    InferCreationAttributes,
    InferAttributes,
    Sequelize
} from 'sequelize'
import {BaseModel} from "../../../Ship/BaseModel";

export class Role extends BaseModel<
    InferAttributes<Role>,
    InferCreationAttributes<Role>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    static initModel(sequelize: Sequelize): typeof Role {
        Role.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
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

        return Role
    }
}
