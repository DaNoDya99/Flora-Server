const SubCategoryServices = require('../services/sub-category-services');

class SubCategoryController{
    async getSubCategories(req, res){
        try {
            const subCategories =  await SubCategoryServices.getSubCategories();
            res.status(200).json({status:"success",message:"Sub Categories Fetched Successfully",subCategories : subCategories})
        }catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new SubCategoryController();