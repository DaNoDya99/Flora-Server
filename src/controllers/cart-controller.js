const CartService = require('../services/cart-service');

class CartController {
  async addItemToCart(req, res) {
    const item = req.body;
    const cart = await CartService.addItemToCart(item);
    if (cart) {
        res.status(200).json({
            status : 'success',
            message: 'Item added to cart',
            cart: cart
        });
    } else {
        res.status(400).json({
            message: 'Item not added to cart'
        });
    }
  }

    async getCart(req, res) {
        const customer = req.params.customer;
        const cart = await CartService.getCart(customer);
        if (cart) {
            res.status(200).json({
                status : 'success',
                cart: cart
            });
        } else {
            res.status(400).json({
                message: 'Cart not found'
            });
        }
    }
}

module.exports = new CartController();