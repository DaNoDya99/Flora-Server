const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order-controller');

router.post('/place-order', OrderController.placeOrder);
router.get('/customer-orders/:customer', OrderController.getCustomerOrders);
router.get('/orders/:status', OrderController.getOrdersByStatus);
router.get('/orders', OrderController.getAllOrders);
router.get('/order/:id', OrderController.getOrderById);


module.exports = router;