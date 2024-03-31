'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bouquet_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

        Bouquet_images.belongsTo(models.Bouquets, {
            foreignKey: 'product_code',
        });
    }
  }
  Bouquet_images.init({
    product_code: DataTypes.STRING,
    image_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bouquet_images',
    timestamps: false
  });
  return Bouquet_images;
};