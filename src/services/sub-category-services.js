const {Sub_categories} = require('../models');

class SubCategoryServices{
    async getSubCategories() {
        try {
            return await Sub_categories.findAll();
        }catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new SubCategoryServices();