'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sub_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

        // A sub-category belongs to a category
        Sub_categories.belongsTo(models.Categories, {
          foreignKey: 'category_id',
        });

        // A sub-category has many bouquets
        Sub_categories.hasMany(models.Bouquets, {
          foreignKey: 'sub_category',
        });
    }
  }
  Sub_categories.init({
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sub_categories',
    timestamps: false
  });

  return Sub_categories;
};