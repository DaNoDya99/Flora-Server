'use strict';

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

    return queryInterface.bulkInsert('Flowers', [
      {
        name: 'Lilies',
        freshness: 10
      },
      {
        name: 'Roses',
        freshness: 7
      },
      {
        name: 'Chrysanthemums',
        freshness: 5
      },
      {
        name: 'Gerbera',
        freshness: 9
      },

    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Flowers', null, {})
  }
};
