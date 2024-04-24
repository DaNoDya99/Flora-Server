const bcrypt = require('bcrypt');
const { Employee } = require('../models');
const { Orders } = require('../models');
const {Op} = require("sequelize");

class EmployeeService {
    async addEmployee(employee) {
        const employeeExists = await Employee.findOne({where: {email: employee.email}}).then((employee) => {
            return employee;
        }).catch((error) => {
            return null;
        });

        if (employeeExists) {
            throw new Error("Employee already exists");
        }

        const hashedPassword = await bcrypt.hash(employee.password, 10);

        const emp = {
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            password: hashedPassword,
            contact: employee.contact,
            emergencyContact: employee.emergencyContact,
            age: employee.age,
            addressLine1: employee.address1,
            addressLine2: employee.address2,
            addressLine3: employee.address3,
            city: employee.city,
            nic: employee.nic,
            role: employee.role,
            image: employee.profilePicture.path,
            gender: employee.gender,
            isActivated: false,
        }

        console.log(emp);

        return await Employee.create(
            emp
        ).then((newEmployee) => {
            return newEmployee;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    async getEmployees() {
        return await Employee.findAll().then((employees) => {
            return employees;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    async updateEmployee(employee) {
        const emp = {
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            contact: employee.contact,
            emergencyContact: employee.emergencyContact,
            age: employee.age,
            addressLine1: employee.address1,
            addressLine2: employee.address2,
            addressLine3: employee.address3,
            city: employee.city,
            image: employee.image.path
       }

         return await Employee.update(emp, { where: { id: employee.id } }).then((updatedEmployee) => {
              return updatedEmployee;
         }).catch((error) => {
              throw new Error(error.message);
         });
    }

    async login(credentials) {
        const employee = await Employee.findOne({where: {email: credentials.email}}).then((employee) => {
            return employee;
        }).catch((error) => {
            return null;
        });

        if (!employee) {
            throw new Error("Employee not found");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, employee.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        return employee;
    }

    async getDeliveryPersonnel() {
        return await Employee.findAll({where: {role: 'delivery'}}).then((employees) => {
            return employees;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    async getDeliveryPersonnelAssignedOrderCounts() {
        const employees = await Employee.findAll({where: {role: 'delivery'}}).then((employees) => {
            return employees;
        }).catch((error) => {
            throw new Error(error.message);
        });
        // Delivery status should not be delivered
        for(let i = 0; i < employees.length; i++){
            employees[i].dataValues.orderCount = await Orders.count({where: {delivery_person: employees[i].id, delivery_method: 'delivery', order_status: { [Op.ne]: 'delivered' }}}).then((count) => {
                return count;
            }).catch((error) => {
                throw new Error(error.message);
            });
        }

        return employees;
    }
}

module.exports = new EmployeeService();