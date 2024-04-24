const {Orders} = require('../models');
const {Order_items} = require('../models');
const {Cart} = require('../models');
const {Bouquets} = require('../models');
const functions = require('../middlewares/functions');
const sequelize = require("sequelize");

class OrderServices {
  async placeOrder(order) {
    const order_id = functions.generateIds('ODR');

    const createdOrder = await Orders.create({
        order_id : order_id,
        total: order.total,
        customer: order.customer,
        sender_name: order.sender_name,
        sender_email: order.sender_email,
        sender_phone: order.sender_phone,
        recipient_name: order.recipient_name,
        recipient_address: order.recipient_address,
        recipient_city: order.recipient_city,
        recipient_phone: order.recipient_phone,
        order_status: 'pending',
        delivery_method: order.delivery_method === 'delivered'? 'delivery' : order.delivery_method === 'pickup' ? 'pickup' : '',
        delivery_date: order.delivery_date,
        payment_method: order.payment_method
        }).then(order => {
            return order;
        }).catch(error => {
            throw new Error(error);
        });

    let orderItems = [];

    for(let i = 0; i < order.order_items.length; i++){
        orderItems.push({
            order_id: order_id,
            product_code: order.order_items[i].product_code,
            quantity: order.order_items[i].quantity,
        });
    }

    const createdOrderItems = await Order_items.bulkCreate(orderItems).then(orderItems => {
        return orderItems;
    }).catch(error => {
        throw new Error(error);
    });

    const deletedCartItems = await Cart.destroy({
        where: {
            customer: order.customer
        }
    }).then(() => {
        return true;
    }).catch(error => {
        throw new Error(error);
    });

    for(let i = 0; i < orderItems.length; i++){
        const product = await Bouquets.findOne({
            where: {
                product_code: orderItems[i].product_code
            }
        });

        if(product){
            const updatedProduct = await Bouquets.update({
                quantity: parseInt(product.quantity) - parseInt(orderItems[i].quantity)
            }, {
                where: {
                    product_code: orderItems[i].product_code
                }
            }).then(() => {
                return true;
            }).catch(error => {
                throw new Error(error);
            });
        }
    }

    return createdOrder && createdOrderItems && deletedCartItems;
  }

    async getOrders(customer) {
      const orders = await Orders.findAll({
          where: {
            customer: parseInt(customer)
          }
        }).then(orders => {
          return orders;
        }).catch(error => {
          throw new Error(error);
        });

        for(let i = 0; i < orders.length; i++){
            orders[i].dataValues.order_items = await Order_items.findAll({
                where: {
                    order_id: orders[i].order_id
                }
            }).then(orderItems => {
                return orderItems;
            }).catch(error => {
                throw new Error(error);
            });
        }

        return orders;
    }

    async getOrdersByStatus(status) {
      const orders = await Orders.findAll({
          where: {
            order_status: status,
              delivery_method: 'delivery'
          }
        }).then(orders => {
          return orders;
        }).catch(error => {
          throw new Error(error);
        });

        for(let i = 0; i < orders.length; i++){
            orders[i].dataValues.order_items = await Order_items.findAll({
                where: {
                    order_id: orders[i].order_id,
                }
                }).then(orderItems => {
                  return orderItems;
                }).catch(error => {
                  throw new Error(error);
                });
        }

        return orders;
    }

    async getAllOrders() {
      const orders = await Orders.findAll().then(orders => {
          return orders;
        }).catch(error => {
          throw new Error(error);
        });

        for(let i = 0; i < orders.length; i++){
            orders[i].order_items = await Order_items.findAll({
                where: {
                    order_id: orders[i].order_id
                }
                }).then(orderItems => {
                  return orderItems;
                }).catch(error => {
                  throw new Error(error);
                });
        }

        return orders;
    }

    async getOrderById(id) {
      const order = await Orders.findOne({
          where: {
            order_id: id
          }
        }).then(order => {
          return order;
        }).catch(error => {
          throw new Error(error);
        });

        if(order){
            order.order_items = await Order_items.findAll({
                where: {
                    order_id: order.order_id
                }
                }).then(orderItems => {
                  return orderItems;
                }).catch(error => {
                  throw new Error(error);
                });
        }

        return order;
    }

    async getOrderPendingOrderCountsGroupedByCity() {
        return await Orders.findAll({
                where: {
                    order_status: 'pending'
                },
                attributes: ['recipient_city', [sequelize.fn('COUNT', 'recipient_city'), 'order_count']],
                group: ['recipient_city']
            }).then(orderCounts => {
                return orderCounts;
            }).catch(error => {
                throw new Error(error);
            });
    }

    async assignDeliveryPerson(deliveryPerson) {
        return await Orders.update({
            delivery_person: deliveryPerson.deliveryPerson,
            order_status: 'processing'
        }, {
            where: {
                recipient_city: deliveryPerson.city
            }
        }).then(() => {
            return true;
        }).catch(error => {
            throw new Error(error);
        });
    }

    async updateOrderStatus(order) {
        return await Orders.update({
            order_status: order.order_status
        }, {
            where: {
                order_id: order.order_id
            }
        }).then(() => {
            return true;
        }).catch(error => {
            throw new Error(error);
        });
    }
}

module.exports = new OrderServices();