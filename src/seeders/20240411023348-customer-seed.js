'use strict';

const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const hashedPassword = await bcrypt.hash('Akila@123', 10);

    return queryInterface.bulkInsert('Customers', [
        {
          firstName: "Akila",
          lastName: "Santhush",
          email: "akilas@gmail.com",
          password: hashedPassword,
          isActivated: true
        }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Customers', null, {});
  }
};
