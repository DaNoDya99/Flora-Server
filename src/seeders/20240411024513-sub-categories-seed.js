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
    return queryInterface.bulkInsert('Sub_categories', [
        {
          name: "Birthday",
          category_id: 1
        },
        {
          name: "Love & Romance",
          category_id: 1
        },
        {
          name: "Anniversary",
          category_id: 1
        },
        {
          name: "Wedding",
          category_id: 1
        },
        {
          name: "Congratulations",
          category_id: 1
        },
        {
          name: "Lilies",
          category_id: 2
        },
        {
          name: "Roses",
          category_id: 2
        },
        {
          name: "Chrysanthemums",
          category_id: 2
        },
        {
          name: "Gerbera",
          category_id: 2
        },
        {
          name: "Mix",
          category_id: 2
        },
        {
          name: "Pink",
          category_id: 3
        },
        {
          name: "Red",
          category_id: 3
        },
        {
          name: "White",
          category_id: 3
        },
        {
          name: "Yellow",
          category_id: 3
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

    return queryInterface.bulkDelete('Sub_categories',null,{})
  }
};
