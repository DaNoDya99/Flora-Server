const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order-controller');

router.post('/place-order', OrderController.placeOrder);
router.get('/get-customer-orders/:customer', OrderController.getCustomerOrders);
router.get('/get-orders/:status', OrderController.getOrdersByStatus);
router.get('/get-orders', OrderController.getAllOrders);
router.get('/get-order/:id', OrderController.getOrderById);
router.get('/get-pending-order_counts-groupedby-city', OrderController.getOrderPendingOrderCountsGroupedByCity);
router.post('/assign-delivery-person', OrderController.assignDeliveryPerson);
router.post('/update-order-status', OrderController.updateOrderStatus);

module.exports = router;