'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bouquet_images', {
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
        onDelete: 'CASCADE'
      },
      image_path: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bouquet_images');
  }
};