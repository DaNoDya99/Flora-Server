const generateId = require('../middlewares/functions');
const Bouquets = require('../models/bouquets');

class BouquetService{
    async addBouquet(bouquet){
        let Id = generateId.generateIds('BOUQ');
        while(true){
            const bouquet = await Bouquets.findOne({where : {product_code : Id}});
            if(bouquet){
                Id = generateId.generateIds('BOUQ');
            }else{
                break;
            }
        }

        const newBouquet = await Bouquets.create({
            product_code : Id,
            name : bouquet.name,
            quantity : bouquet.quantity,
            reorder_level : bouquet.reorder_level,
            category : bouquet.category,
            sub_category : bouquet.sub_category,
            price : bouquet.price,
            description : bouquet.description,
        });


    }
}

module.exports = new BouquetService();
