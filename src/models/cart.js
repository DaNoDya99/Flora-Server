'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init({
    product_code: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    customer: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Cart',
  });
  return Cart;
};