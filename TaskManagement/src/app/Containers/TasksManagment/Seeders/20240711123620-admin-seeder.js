'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash('adminpassword', 10);

    // Seed admin user
    await queryInterface.bulkInsert('users', [{
      email: 'admin@example.com',
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

    // Seed admin role if not exists
    let adminRole = await queryInterface.sequelize.query(
        'SELECT id FROM roles WHERE name = :name LIMIT 1',
        {
          replacements: { name: 'admin' },
          type: Sequelize.QueryTypes.SELECT,
        }
    );

    if (adminRole.length === 0) {
      await queryInterface.bulkInsert('roles', [{
        name: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      }], {});

      adminRole = await queryInterface.sequelize.query(
          'SELECT id FROM roles WHERE name = :name LIMIT 1',
          {
            replacements: { name: 'admin' },
            type: Sequelize.QueryTypes.SELECT,
          }
      );
    }

    const adminUser = await queryInterface.sequelize.query(
        'SELECT id FROM users WHERE email = :email LIMIT 1',
        {
          replacements: { email: 'admin@example.com' },
          type: Sequelize.QueryTypes.SELECT,
        }
    );

    await queryInterface.bulkInsert('user_roles', [{
      user_id: adminUser[0].id,
      role_id: adminRole[0].id,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove admin user and role
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
    await queryInterface.bulkDelete('roles', { name: 'admin' }, {});
    await queryInterface.bulkDelete('user_roles', {}, {});
  }
};
