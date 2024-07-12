const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        field: 'title',
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        field: 'description',
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        field: 'status',
        allowNull: false,
        defaultValue: 'pending'
      },
      dueDate: {
        type: DataTypes.DATE,
        field: 'due_date',
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tasks');
  },
};
