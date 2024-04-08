const CategoryService = require('../services/category-service');

class CategoryController {
    async getCategories(req, res) {
        try {
            const categories = await CategoryService.getCategories();
            res.json({status : "success", message: "Categories fetched successfully", categories: categories});
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = new CategoryController();