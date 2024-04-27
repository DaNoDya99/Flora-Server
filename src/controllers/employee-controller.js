const EmployeeService = require('../services/employee-service');
const {custom} = require("joi");

class EmployeeController {
    async addEmployee(req, res, next) {
        try {
            const employee = req.body;
            employee.profilePicture = req.file;
            const response = await EmployeeService.addEmployee(employee);
            res.status(201).json({ status : "success", message : "Employee registered successfully", employee : response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getEmployees(req, res, next) {
        try {
            const employees = await EmployeeService.getEmployees();
            res.status(200).json({ status: "success", message: "Employees fetched successfully", employees: employees });
        }catch (error) {
            res.status(400).json({ status : "failed", message: error.message });
        }
    }

    async updateEmployee(req, res, next) {
        try {
            const employee = req.body;
            employee.image = req.file === undefined ? employee.image : req.file;
            console.log(employee);
            const response = await EmployeeService.updateEmployee(employee);
            res.status(200).json({ status: "success", message: "Employee updated successfully", employee: response });
        }catch (error) {
            res.status(400).json({ status : "failed", message: error.message });
        }
    }

    async login(req, res, next) {
        try {
            const credentials = req.body;
            const response = await EmployeeService.login(credentials);
            res.status(200).json({ status: "success", message: "Login successful", employee: response });
        } catch (error) {
            res.status(400).json({ status: "failed", message: error.message });
        }
    }

    async getDeliveryPersonnel(req, res, next) {
        try {
            const employees = await EmployeeService.getDeliveryPersonnel();
            res.status(200).json({ status: "success", message: "Delivery personnel fetched successfully", employees: employees });
        }catch (error) {
            res.status(400).json({ status : "failed", message: error.message });
        }
    }

    async getDeliveryPersonnelAssignedOrderCounts(req, res, next) {
        try {
            const employees = await EmployeeService.getDeliveryPersonnelAssignedOrderCounts();
            res.status(200).json({ status: "success", message: "Delivery personnel fetched successfully", employees: employees });
        }catch (error) {
            res.status(400).json({ status : "failed", message: error.message });
        }
    }

    async deleteEmployee(req, res, next) {
        try {
            const employeeId = req.params.id;
            const response = await EmployeeService.deleteEmployee(employeeId);
            res.status(200).json({ status: "success", message: "Employee deleted successfully", employee: response });
        }catch (error) {
            res.status(400).json({ status : "failed", message: error.message });
        }
    }
}

module.exports = new EmployeeController();