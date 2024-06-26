const CustomerService = require('../services/customer-service');
const {custom} = require("joi");

class CustomerController {
    async registerCustomer(req, res, next) {
        try {
            const customer = req.body;
            const response = await CustomerService.registerCustomer(customer);
            res.status(201).json({ status : "success", message : "Customer registered successfully", customer : response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async loginCustomer(req, res, next) {
        try {
            const { email, password } = req.body;
            const customer = await CustomerService.loginCustomer(email, password);
            console.log(customer);
            res.status(200).json({ status: "success", message: "Customer logged in successfully", customer: customer });
        }catch (error) {
            res.status(400).json({ status : "failed", message: error.message });
        }
    }

    async sayHello(req, res, next) {
        res.status(200).json({ message: "Hello" });
    }

    async updateCustomer(req, res, next) {
        try {
            const customer = req.body;
            const response = await CustomerService.updateCustomer(customer);
            res.status(200).json({ status : "success", message : "Customer updated successfully", customer : response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async resetPassword(req, res, next) {
        try {
            const data = req.body;
            const response = await CustomerService.resetPassword(data);
            res.status(200).json({ status : "success", message : "Password reset successfully", customer : response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new CustomerController();
