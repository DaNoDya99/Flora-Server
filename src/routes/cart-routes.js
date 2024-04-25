const express = require('express');
const CartController = require('../controllers/cart-controller');
const router = express.Router();

router.post('/add-item', CartController.addItemToCart);
router.get('/get-cart/:customer', CartController.getCart);
router.post('/remove-item', CartController.removeItemFromCart);

module.exports = router;