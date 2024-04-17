const express = require('express');
const customerRoutes = require('./customer-routes');
const employeeRoutes = require('./employee-routes');
const bouquetRoutes = require('./bouquet-routes');
const categoryRoutes = require('./category-routes');
const subCategoryRoutes = require('./sub-category-routes');
const cartRoutes = require('./cart-routes');

const router = express.Router();

router.use('/customers', customerRoutes);
router.use('/employees', employeeRoutes);
router.use('/bouquets', bouquetRoutes);
router.use('/categories', categoryRoutes);
router.use('/sub-categories', subCategoryRoutes);
router.use('/cart', cartRoutes);

module.exports = router;