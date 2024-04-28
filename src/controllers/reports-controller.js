const ReportsService = require('../services/reports-service');

class ReportsController {
    async calculateTotalIncomeThisWeek(req, res, next) {
        try {
            const response = await ReportsService.calculateTotalIncomeThisWeek();
            res.status(200).json({ status : "success", message : "Total income calculated successfully", totalIncome : response.totalIncome})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async numberOfOrdersYesterday(req, res, next) {
        try {
            const response = await ReportsService.numberOfOrdersYesterday();
            res.status(200).json({ status : "success", message : "Number of orders per day calculated successfully", numberOfOrdersPerDay : response.numberOfOrdersLastDay})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async numberOfPendingOrders(req, res, next) {
        try {
            const response = await ReportsService.numberOfPendingOrders();
            res.status(200).json({ status : "success", message : "Number of pending orders calculated successfully", numberOfPendingOrders : response.numberOfPendingOrders})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async numberOfOrdersDeliveredYesterday(req, res, next) {
        try {
            const response = await ReportsService.numberOfOrdersDeliveredYesterday();
            res.status(200).json({ status : "success", message : "Number of orders delivered yesterday calculated successfully", numberOfOrdersDeliveredYesterday : response.numberOfOrdersDeliveredYesterday})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async topSellingBouquetsWithinTheWeek(req, res, next) {
        try {
            const response = await ReportsService.topSellingBouquetsWithinTheWeek();
            res.status(200).json({ status : "success", message : "Top selling bouquets within the week calculated successfully", topSellingBouquets : response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async lowQuantityProducts(req, res, next) {
        try {
            const response = await ReportsService.lowQuantityProducts();
            res.status(200).json({ status : "success", message : "Low quantity products calculated successfully", lowQunatityProducts : response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async dailyIncomeThisWeekVsLastWeek(req, res, next) {
        try {
            const response = await ReportsService.dailyIncomeThisWeekVsLastWeek();
            res.status(200).json({ status : "success", message : "Daily income this week vs last week calculated successfully", dailyIncome : response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async pendingDeliveriesCountForADeliveryPerson(req, res, next) {
        try {
            const response = await ReportsService.pendingDeliveriesCountForADeliveryPerson(req.params.id);
            res.status(200).json({ status : "success", message : "Pending deliveries for a delivery person calculated successfully", pendingDeliveries : response.pendingDeliveriesCount})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async completedDeliveriesCountForADeliveryPerson(req, res, next) {
        try {
            const response = await ReportsService.completedDeliveriesCountForADeliveryPerson(req.params.id);
            res.status(200).json({ status : "success", message : "Completed deliveries for a delivery person calculated successfully", completedDeliveries : response.completedOrdersCount})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async failedDeliveriesCountForADeliveryPerson(req, res, next) {
        try {
            const response = await ReportsService.failedDeliveriesCountForADeliveryPerson(req.params.id);
            res.status(200).json({ status : "success", message : "Failed deliveries for a delivery person calculated successfully", failedDeliveries : response.failedOrdersCount})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async overallDeliveryPerformance(req, res, next) {
        try {
            const response = await ReportsService.overallDeliveryPerformance(req.params.id);
            res.status(200).json({ status : "success", message : "Overall delivery performance calculated successfully", deliveryPerformance : response.deliveryPerformance})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deliveryFailureDetails(req, res, next) {
        try {
            const response = await ReportsService.deliveryFailureDetails(req.params.id);
            res.status(200).json({ status : "success", message : "Delivery failure details calculated successfully", deliveryFailureDetails : response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async countOrdersDeliveredWithinTheWeek(req, res, next) {
        try {
            const response = await ReportsService.countOrdersDeliveredWithinTheWeek(req.params.id);
            res.status(200).json({ status : "success", message : "Orders delivered within the week calculated successfully", ordersDeliveredWithinTheWeek : response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async countOrdersDeliveredByEachDeliveryPerson(req, res, next) {
        try {
            const response = await ReportsService.countOrdersDeliveredByEachDeliveryPerson();
            res.status(200).json({ status : "success", message : "Orders delivered by each delivery person calculated successfully", ordersDeliveredByEachDeliveryPerson : response})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ReportsController();