'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Employee.hasMany(models.Orders, {
            foreignKey: 'delivery_person',
        });
    }
  }
  Employee.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    contact: DataTypes.STRING,
    emergencyContact: DataTypes.STRING,
    age: DataTypes.INTEGER,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    addressLine3: DataTypes.STRING,
    city: DataTypes.STRING,
    nic: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'delivery'),
    gender: DataTypes.ENUM('male','female'),
    isActivated: DataTypes.BOOLEAN,
    registrationDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps: false
  });
  return Employee;
};