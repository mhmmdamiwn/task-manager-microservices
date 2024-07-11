'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('roles', [{
          name: 'user',
          created_at: new Date(),
          updated_at: new Date(),
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove user role
    await queryInterface.bulkDelete('roles', { name: 'user' }, {});
  }
};
