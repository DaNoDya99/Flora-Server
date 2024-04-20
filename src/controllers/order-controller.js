const OrderService = require('../services/order-services');

class OrderController {
    async placeOrder(req, res, next) {
        try {
            const order = req.body;
            const response = await OrderService.placeOrder(order);
            if(response){
                res.status(201).json({ status : "success", message : "Order placed successfully"})
            }else {
                res.status(400).json({ status : "failed", message : "Order placement failed" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getCustomerOrders(req, res, next) {
        const customer = req.params.customer;
        try {
            const orders = await OrderService.getOrders(customer);
            if(orders){
                res.status(200).json(orders);
            }else{
                res.status(404).json({ message: "No orders found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOrdersByStatus(req, res, next) {
        const status = req.params.status;
        try {
            const orders = await OrderService.getOrdersByStatus(status);
            if(orders){
                res.status(200).json(orders);
            }else{
                res.status(404).json({ message: "No orders found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const orders = await OrderService.getAllOrders();
            if(orders){
                res.status(200).json(orders);
            }else{
                res.status(404).json({ message: "No orders found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOrderById(req, res, next) {
        const id = req.params.id;
        try {
            const order = await OrderService.getOrderById(id);
            if(order){
                res.status(200).json(order);
            }else{
                res.status(404).json({ message: "No order found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new OrderController();