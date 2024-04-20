'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Order_items.belongsTo(models.Orders, {
            foreignKey: 'order_id',
        });
    }
  }
  Order_items.init({
    product_code: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    order_id: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Order_items',
  });
  return Order_items;
};