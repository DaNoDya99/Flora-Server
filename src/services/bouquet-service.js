const generateId = require('../middlewares/functions');
const Bouquets = require('../models/bouquets');
const BouquetImages = require('../models/bouquet_images');
const BouquetFlowers = require('../models/bouquet_flowers');

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
        }).then((response) => {
            return true;
        }).catch((error) => {
            return false;
        })

        let image_list = []

        for(let i = 0; i < bouquet.images.length; i++){
            image_list.push({
                product_code: Id,
                image_path: bouquet.images[i].path
            })
        }

        const newBouquetImages = await BouquetImages().bulkCreate(image_list).then((response) => {
            return true;
        }).catch((error) => {
            return false
        })

        let flowers_list = []

        if(bouquet.lilies){
            flowers_list.push({
                product_code: Id,
                flower_type : 1,
                quantity : bouquet.liliesQuantity
            })
        }else if(bouquet.chrysanthemums){
            flowers_list.push({
                product_code: Id,
                flower_type : 2,
                quantity : bouquet.chrysanthemumsQuantity
            })
        }else if(bouquet.roses){
            flowers_list.push({
                product_code: Id,
                flower_type : 3,
                quantity : bouquet.rosesQuantity
            })
        }else if(bouquet.gerbera){
            flowers_list.push({
                product_code: Id,
                flower_type : 4,
                quantity : bouquet.gerberaQuantity
            })
        }

        const newBouquetFlowers = await BouquetFlowers().bulkCreate(flowers_list).then((response) => {
            return true;
        }).catch((error) => {
            return false;
        })

        return newBouquet && newBouquetImages && newBouquetFlowers;
    }

    async getBouquets(){
        return true
    }
}

module.exports = new BouquetService();
