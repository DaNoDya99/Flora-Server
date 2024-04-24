'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.INTEGER
      },
      sender_name: {
        type: Sequelize.STRING
      },
      sender_email: {
        type: Sequelize.STRING
      },
      sender_phone: {
        type: Sequelize.STRING
      },
      recipient_name: {
        type: Sequelize.STRING
      },
      recipient_address: {
        type: Sequelize.STRING
      },
      recipient_city: {
        type: Sequelize.STRING
      },
      recipient_phone: {
        type: Sequelize.STRING
      },
      order_status: {
        type: Sequelize.ENUM('pending','processing','dispatched','delivered')
      },
      delivery_method: {
        type: Sequelize.ENUM('pickup','delivery')
      },
      delivery_date: {
        type: Sequelize.DATEONLY
      },
      payment_method: {
        type: Sequelize.ENUM('card','cash')
      },
      delivery_person: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};