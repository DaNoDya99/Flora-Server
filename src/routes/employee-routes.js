const express = require('express');
const EmployeeController = require('../controllers/employee-controller');
const upload=require('../middlewares/multer');

const router = express.Router();

router.route('/add').post(upload.single('profilePicture'), EmployeeController.addEmployee);
router.route('/get-employees').get(EmployeeController.getEmployees);
router.route('/update').put(upload.single('image'), EmployeeController.updateEmployee);
router.route('/login').post(EmployeeController.login)

module.exports = router;