const express = require('express');
const CategoryController = require('../controllers/category-controller');

const router = express.Router();

router.route('/get').get(CategoryController.getCategories);

module.exports = router;