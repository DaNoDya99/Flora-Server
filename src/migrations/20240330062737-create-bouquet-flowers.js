'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bouquet_flowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Bouquets',
          key: 'product_code'
        },
        onUpdate: 'CASCADE',
      },
      flower_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Flowers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bouquet_flowers');
  }
};