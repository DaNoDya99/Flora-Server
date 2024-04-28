const express = require('express');
const ReportsController = require('../controllers/reports-controller');

const router = express.Router();

router.get('/total-income-this-week', ReportsController.calculateTotalIncomeThisWeek.bind(ReportsController));
router.get('/orders-last-day', ReportsController.numberOfOrdersYesterday.bind(ReportsController));
router.get('/pending-orders', ReportsController.numberOfPendingOrders.bind(ReportsController));
router.get('/orders-delivered-yesterday', ReportsController.numberOfOrdersDeliveredYesterday.bind(ReportsController));
router.get('/top-selling-bouquets', ReportsController.topSellingBouquetsWithinTheWeek.bind(ReportsController));
router.get('/low-quantity-products', ReportsController.lowQuantityProducts.bind(ReportsController));
router.get('/daily-income-comparison', ReportsController.dailyIncomeThisWeekVsLastWeek.bind(ReportsController));
router.get('/pending-delivery-orders-count/:id', ReportsController.pendingDeliveriesCountForADeliveryPerson.bind(ReportsController));
router.get('/completed-delivery-orders/:id', ReportsController.completedDeliveriesCountForADeliveryPerson.bind(ReportsController));
router.get('/failed-delivery-orders/:id', ReportsController.failedDeliveriesCountForADeliveryPerson.bind(ReportsController));
router.get('/overall-delivery-performance/:id', ReportsController.overallDeliveryPerformance.bind(ReportsController));
router.get('/failed-delivery-details/:id', ReportsController.deliveryFailureDetails.bind(ReportsController));
router.get('/order-count-delivered/:id', ReportsController.countOrdersDeliveredWithinTheWeek.bind(ReportsController));
router.get('/order-count-delivered-by-each', ReportsController.countOrdersDeliveredByEachDeliveryPerson.bind(ReportsController));

module.exports = router;