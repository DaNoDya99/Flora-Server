'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flowers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Flowers.hasMany(models.Bouquet_flowers, {
            foreignKey: 'flower_type',
        });
    }
  }
  Flowers.init({
    name: DataTypes.STRING,
    freshness: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Flowers',
    timestamps: false
  });
  return Flowers;
};

