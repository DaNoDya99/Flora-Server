const {Categories} = require('../models');

class CategoryService {
    async getCategories() {
        try {
            return await Categories.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new CategoryService();