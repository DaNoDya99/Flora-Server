'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Customer, {
        foreignKey: 'customer',
      });

        Orders.hasMany(models.Order_items, {
            foreignKey: 'order_id',
        });

        Orders.belongsTo(models.Employee, {
            foreignKey: 'delivery_person',
        });
    }
  }
  Orders.init({
    order_id: DataTypes.STRING,
    total: DataTypes.STRING,
    customer: DataTypes.INTEGER,
    sender_name: DataTypes.STRING,
    sender_email: DataTypes.STRING,
    sender_phone: DataTypes.STRING,
    recipient_name: DataTypes.STRING,
    recipient_address: DataTypes.STRING,
    recipient_city: DataTypes.STRING,
    recipient_phone: DataTypes.STRING,
    order_status: DataTypes.ENUM('pending','processing','dispatched','delivered'),
    delivery_method: DataTypes.ENUM('pickup','delivery'),
    delivery_date: DataTypes.DATEONLY,
    payment_method: DataTypes.ENUM('card','cash'),
    delivery_person: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Orders',
  });
  return Orders;
};