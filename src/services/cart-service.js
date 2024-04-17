const {Cart} = require('../models');

class CartService{
    async addItemToCart(item){
        // Add item to cart
        try {
            return await Cart.create({
                product_code: item.product_code,
                quantity: item.quantity,
                customer: item.customer
            }).then((cart) => {
                return cart;
            }).catch((error) => {
                return null;
            });
        } catch (error) {
            return null;
        }
    }

    async getCart(customer){
        // Get cart items
        try {
            const cartDetails = await Cart.findAll({
                where: {
                    customer: customer
                }
            }).then((cart) => {
                return cart;
            }).catch((error) => {
                return null;
            });

            const bouquetList = [];

            for (let item in cartDetails){
                const bouquet = await Bouquets.findOne({
                    where: {
                        product_code: cartDetails[item].dataValues.product_code
                    }
                }).then((bouquet) => {
                    return bouquet;
                }).catch((error) => {
                    return null;
                });

                bouquet.dataValues.quantity = cartDetails[item].dataValues.quantity;
                bouquetList.push(bouquet);
            }
        } catch (error) {
            return null;
        }
    }
}

module.exports = new CartService();