'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bouquet_flowers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Bouquet_flowers.belongsTo(models.Bouquets, {
            foreignKey: 'product_code',
        });

        Bouquet_flowers.belongsTo(models.Flowers, {
            foreignKey: 'flower_type',
        });
    }
  }
  Bouquet_flowers.init({
    product_code: DataTypes.STRING,
    flower_type: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bouquet_flowers',
    timestamps: false
  });
  return Bouquet_flowers;
};