const SubCategoryServices = require('../services/sub-category-services');

class SubCategoryController{
    async getSubCategories(req, res){
        try {
            return await SubCategoryServices.getSubCategories();
        }catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new SubCategoryController();