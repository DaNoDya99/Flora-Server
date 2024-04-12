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

    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    return queryInterface.bulkInsert('Employees',[{
      firstName : "Edward",
      lastName : "Samuel",
      image : "public/uploads/images/1712463360643_.jpeg",
      email : "edwardsam@gmail.com",
      password : hashedPassword,
      contact : "0766022644",
      emergencyContact : "03882344642",
      age: 27,
      addressLine1 : "207 / 3 B",
      addressLine2 : "The Prince Road",
      city : "Colombo 0070",
      nic : "199713243576",
      role : "admin",
      gender : "male",
      isActivated : true
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Employees', null, {});
  }
};
