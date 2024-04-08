const express = require('express');
const SubCategoryController = require('../controllers/sub-category-controller');
const router = express.Router();

router.get('/sub-categories', SubCategoryController.getSubCategories);

module.exports = router;