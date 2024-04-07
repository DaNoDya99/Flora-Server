const express = require('express');
const customerRoutes = require('./customer-routes');
const employeeRoutes = require('./employee-routes');
const bouquetRoutes = require('./bouquet-routes');

const router = express.Router();

router.use('/customers', customerRoutes);
router.use('/employees', employeeRoutes);
router.use('/bouquets', bouquetRoutes);

module.exports = router;