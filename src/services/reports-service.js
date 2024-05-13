
const moment = require('moment');
const { Orders } = require('../models');
const { Bouquets } = require('../models');
const { Employee } = require('../models');
const { Order_items } = require('../models');
const {Op} = require("sequelize");
const sequelize = require("sequelize");


class ReportsService {
    async calculateTotalIncomeThisWeek() {
        let weekEnd = new Date();
        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);

        weekStart= moment(weekStart).format('YYYY-MM-DD');
        weekEnd= moment(weekEnd).format('YYYY-MM-DD');


        const orders = await Orders.findAll({
            where: {
                order_date: {
                    [Op.between]: [weekStart, weekEnd]
                }
            }
        });

        let totalIncome = 0;

        for (let i = 0; i < orders.length; i++) {
            totalIncome += parseFloat(orders[i].total);
        }

        return {
            totalIncome: totalIncome
        }

    }

    async numberOfOrdersYesterday() {
        let yesterday = moment().subtract(1, 'days').toDate();
        let today = moment().toDate();

        const orders = await Orders.findAll({
            where: {
                order_date: {
                    [Op.between]: [yesterday, today]
                }
            }
        });

        return {
            numberOfOrdersLastDay: orders.length
        }
    }

    async numberOfPendingOrders() {
        const orders = await Orders.count({
            where: {
                order_status: 'pending'
            }
        });

        return {
            numberOfPendingOrders: orders
        }
    }

    async numberOfOrdersDeliveredYesterday() {
        let yesterday = moment().subtract(1, 'days').toDate();
        let today = moment().toDate();

        const orders = await Orders.count({
            where: {
                order_date: {
                    [Op.between]: [yesterday, today]
                },
                order_status: 'delivered'
            }
        });

        return {
            numberOfOrdersDeliveredYesterday: orders
        }
    }

    async topSellingBouquetsWithinTheWeek() {
        let weekEnd = new Date();
        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);

        weekStart= moment(weekStart).format('YYYY-MM-DD');
        weekEnd= moment(weekEnd).format('YYYY-MM-DD');

        const orders = await Orders.findAll({
            where: {
                order_date: {
                    [Op.between]: [weekStart,weekEnd]
                }
            }
        });

        for(let i = 0; i < orders.length; i++){
            orders[i].dataValues.orderItems = await Order_items.findAll({where: {order_id: orders[i].order_id}}).then((orderItems) => {
                return orderItems;
            }).catch((error) => {
                throw new Error(error.message);
            });
        }

        let bouquetSales = {};

        for(let i = 0; i < orders.length; i++){
            for(let j = 0; j < orders[i].dataValues.orderItems.length; j++){
                if(bouquetSales[orders[i].dataValues.orderItems[j].product_code]){
                    bouquetSales[orders[i].dataValues.orderItems[j].product_code] += parseInt(orders[i].dataValues.orderItems[j].quantity);
                }else{
                    bouquetSales[orders[i].dataValues.orderItems[j].product_code] = parseInt(orders[i].dataValues.orderItems[j].quantity);
                }
            }
        }

        let topSellingBouquets = [];

        for (const [key, value] of Object.entries(bouquetSales)) {
            const bouquet = await Bouquets.findOne({where: {product_code: key}}).then((bouquet) => {
                return bouquet;
            }).catch((error) => {
                throw new Error(error.message);
            });
            topSellingBouquets.push({
                product_code: key,
                quantity: value,
                bouquet_name: bouquet.name
            });
        }

        topSellingBouquets.sort((a, b) => {
            return b.quantity - a.quantity;
        });

        let response = {
            products : [],
            quantity: []
        }

        for(let i = 0; i < topSellingBouquets.length; i++){
            response.products.push(topSellingBouquets[i].bouquet_name);
            response.quantity.push(topSellingBouquets[i].quantity);
        }

        return response;
    }

    async lowQuantityProducts() {
        return await Bouquets.findAll({
            where: {
                quantity: {
                    [Op.lt]: sequelize.col('reorder_level')
                }
            }
        });
    }

    async dailyIncomeThisWeekVsLastWeek() {
        let thisWeekEnd = new Date();
        let thisWeekStart = new Date();
        thisWeekStart.setDate(thisWeekStart.getDate() - 7);

        thisWeekStart= moment(thisWeekStart).format('YYYY-MM-DD');
        thisWeekEnd= moment(thisWeekEnd).format('YYYY-MM-DD');

        let lastWeekEnd = new Date();
        let lastWeekStart = new Date();
        lastWeekStart.setDate(lastWeekStart.getDate() - 14);
        lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);

        lastWeekStart= moment(lastWeekStart).format('YYYY-MM-DD');
        lastWeekEnd= moment(lastWeekEnd).format('YYYY-MM-DD');

        const lastWeekOrders = await Orders.findAll({
            where: {
                order_date: {
                    [Op.between]: [lastWeekStart, lastWeekEnd]
                }
            }
        });

        const thisWeekOrders = await Orders.findAll({
            where: {
                order_date: {
                    [Op.between]: [thisWeekStart, thisWeekEnd]
                }
            }
        });

        let lastWeekIncome = [0, 0, 0, 0, 0, 0, 0];
        let thisWeekIncome = [0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < lastWeekOrders.length; i++) {
            lastWeekIncome[moment(lastWeekOrders[i].order_date).day()] += parseFloat(lastWeekOrders[i].total);
        }

        for (let i = 0; i < thisWeekOrders.length; i++) {
            thisWeekIncome[moment(thisWeekOrders[i].order_date).day()] += parseFloat(thisWeekOrders[i].total);
        }

        return {
            lastWeekIncome: lastWeekIncome,
            thisWeekIncome: thisWeekIncome
        }
    }

    async pendingDeliveriesCountForADeliveryPerson(deliveryPersonId) {
        const orders = await Orders.count({
            where: {
                delivery_person: deliveryPersonId,
                delivery_method: 'delivery',
                order_status: {
                    [Op.ne]: 'delivered'
                }
            }
        });

        return {
            pendingDeliveriesCount: orders
        }
    }

    async completedDeliveriesCountForADeliveryPerson(deliveryPersonId) {
        const orders = await Orders.count({
            where: {
                delivery_person: deliveryPersonId,
                delivery_method: 'delivery',
                order_status: 'delivered'
            }
        });

        return {
            completedOrdersCount: orders
        }
    }

    async failedDeliveriesCountForADeliveryPerson(deliveryPersonId) {
        const orders = await Orders.count({
            where: {
                delivery_person: deliveryPersonId,
                delivery_method: 'delivery'
            }
        });

    //     count orders where delivery date is less than current date

        let failedOrders = 0;
        for(let i = 0; i < orders.length; i++){
            if(orders[i].delivery_date < moment().toDate()){
                failedOrders++;
            }
        }

        return {
            failedOrdersCount: failedOrders
        }
    }

    async overallDeliveryPerformance(id) {
        const orders = await Orders.findAll({
            where: {
                delivery_person: id,
                delivery_method: 'delivery'
            }
        });

        let successfulDeliveries = 0;
        for(let i = 0; i < orders.length; i++){
            if(orders[i].order_status === 'delivered'){
                successfulDeliveries++;
            }
        }

        let deliveryPerformance = (successfulDeliveries / orders.length) * 100;

        return {
            deliveryPerformance: deliveryPerformance
        }
    }

    async deliveryFailureDetails(id) {
        const orders = await Orders.findAll({
            where: {
                delivery_person: id,
                delivery_method: 'delivery'
            }
        });

        let failedOrders = [];
        for(let i = 0; i < orders.length; i++){
            if(orders[i].delivery_date < moment().toDate()){
                failedOrders.push(orders[i]);
            }
        }

        return failedOrders;
    }

    async countOrdersDeliveredWithinTheWeek(id) {
        let weekEnd = new Date();
        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);

        weekStart= moment(weekStart).format('YYYY-MM-DD');
        weekEnd= moment(weekEnd).format('YYYY-MM-DD');

        const orders = await Orders.findAll({
            where: {
                delivery_person: id,
                delivery_method: 'delivery',
                order_status: 'delivered',
                delivery_date: {
                    [Op.between]: [weekStart, weekEnd]
                }
            }
        });

        let ordersDeliveredWithinTheWeek = [0, 0, 0, 0, 0, 0, 0];

        for(let i = 0; i < orders.length; i++){
            ordersDeliveredWithinTheWeek[moment(orders[i].delivery_date).day()]++;
        }

        return ordersDeliveredWithinTheWeek;
    }

    async countOrdersDeliveredByEachDeliveryPerson() {
        const employees = await Employee.findAll({where: {role: 'delivery'}}).then((employees) => {
            return employees;
        }).catch((error) => {
            throw new Error(error.message);
        });


        for(let i = 0; i < employees.length; i++){
            employees[i].dataValues.orderCount = await Orders.count({where: {delivery_person: employees[i].id, delivery_method: 'delivery', order_status: 'delivered'}}).then((count) => {
                return count;
            }).catch((error) => {
                throw new Error(error.message);
            });
        }

        return employees;
    }
}

module.exports = new ReportsService();
