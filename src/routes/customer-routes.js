const express = require('express');
const CustomerController = require('../controllers/customer-controller');
const {validateCreateCustomer, validateLoginCustomer} = require('../validators/customer-validator');

const router = express.Router();

router.post('/register', validateCreateCustomer, CustomerController.registerCustomer.bind(CustomerController));
router.post('/login', validateLoginCustomer, CustomerController.loginCustomer.bind(CustomerController));
router.get('/hello', CustomerController.sayHello.bind(CustomerController));
router.put('/update', CustomerController.updateCustomer.bind(CustomerController));

module.exports = router;