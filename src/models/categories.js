'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        // A category has many sub-categories
        Categories.hasMany(models.Sub_categories, {
          foreignKey: 'category_id',
        });

        // A category has many bouquets
        Categories.hasMany(models.Bouquets, {
          foreignKey: 'category',
        });
    }
  }
  Categories.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',
    timestamps: false
  });
  return Categories;
};