'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bouquets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Bouquets.belongsTo(models.Categories, {
            foreignKey: 'category',
        });

        Bouquets.belongsTo(models.Sub_categories, {
            foreignKey: 'sub_category',
        });

        Bouquets.hasMany(models.Bouquet_flowers, {
            foreignKey: 'product_code',
        });

        Bouquets.hasMany(models.Bouquet_images, {
            foreignKey: 'product_code',
        });
    }
  }
  Bouquets.init({
    product_code: DataTypes.STRING,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    reorder_level: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    sub_category: DataTypes.INTEGER,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    createdDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Bouquets',
    timestamps: false
  });
  return Bouquets;
};