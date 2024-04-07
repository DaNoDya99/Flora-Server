const bcrypt = require('bcrypt');
const { Employee } = require('../models');

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
}

module.exports = new EmployeeService();