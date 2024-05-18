const generateId = require('../middlewares/functions');
const {Bouquets} = require('../models');
const {Bouquet_images} = require('../models');
const {Bouquet_flowers} = require('../models');
const {unlink} = require("fs");
const {Op} = require("sequelize");

class BouquetService{
    async addBouquet(bouquet){
        let Id = generateId.generateIds('BOUQ');

        const bouquetObj = {
            product_code : Id,
            name : bouquet.productName,
            quantity : bouquet.quantity,
            reorder_level : bouquet.reorderLevel,
            category : bouquet.category,
            sub_category : bouquet.sub_category,
            price : bouquet.price,
            description : bouquet.description,
        }

        let image_list = []

        for(let i = 0; i < bouquet.images.length; i++){
            image_list.push({
                product_code: Id,
                image_path: bouquet.images[i].path
            })
        }

        let flowers_list = []

        if(bouquet.lilies === 'true'){
            flowers_list.push({
                product_code: Id,
                flower_type : 1,
                quantity : bouquet.liliesQuantity
            })
        }
        if(bouquet.chrysanthemums === 'true'){
            flowers_list.push({
                product_code: Id,
                flower_type : 2,
                quantity : bouquet.chrysanthemumsQuantity
            })
        }
        if(bouquet.roses === 'true'){
            flowers_list.push({
                product_code: Id,
                flower_type : 3,
                quantity : bouquet.rosesQuantity
            })
        }
        if(bouquet.gerbera === 'true'){
            flowers_list.push({
                product_code: Id,
                flower_type : 4,
                quantity : bouquet.gerberaQuantity
            })
        }

        const newBouquet = await Bouquets.create(bouquetObj).then((bouquet) => {
            return bouquet;
        }).catch((error) => {
            return null;
        });

        const newImages = await Bouquet_images.bulkCreate(image_list).then((images) => {
            return images;
        }).catch((error) => {
            return null;
        });

        const newFlowers = await Bouquet_flowers.bulkCreate(flowers_list).then((flowers) => {
            return flowers;
        }).catch((error) => {
            return null;
        });

        return !!(newBouquet && newImages && newFlowers);
    }

    async getBouquets(){
        const bouquets = await Bouquets.findAll().then((bouquets) => {
            return bouquets;
        }).catch((error) => {
            return null;
        })

        if(bouquets){
            for (let bouquet in bouquets){
                const images = await Bouquet_images.findAll({
                    where: {
                        product_code: bouquets[bouquet].dataValues.product_code
                    }
                }).then((images) => {
                    return images;
                }).catch((error) => {
                    return null;
                });

                const flowers = await Bouquet_flowers.findAll({
                    where: {
                        product_code: bouquets[bouquet].dataValues.product_code
                    }
                }).then((flowers) => {
                    return flowers;
                }).catch((error) => {
                    return null;
                });

                bouquets[bouquet].dataValues.images = images;
                bouquets[bouquet].dataValues.flowers = flowers;

            }

            return bouquets;
        }else{
            return null;
        }
    }

    async removeBouquet(bouquetId){
        const images = await Bouquet_images.findAll({
            where: {
                product_code: bouquetId
            }
        }).then((images) => {
            return images;
        }).catch((error) => {
            return null;
        });

        if(images){
            for(let image in images){
                unlink(images[image].dataValues.image_path, (err) => {
                    if(err){
                        return false;
                    }
                });
            }
        }

        const removedImages = await Bouquet_images.destroy({
            where: {
                product_code: bouquetId
            }
        }).then((images) => {
            return images;
        }).catch((error) => {
            return null;
        });

        const removedFlowers = await Bouquet_flowers.destroy({
            where: {
                product_code: bouquetId
            }
        }).then((flowers) => {
            return flowers;
        }).catch((error) => {
            return null;
        });

        const removedBouquet = await Bouquets.destroy({
            where: {
                product_code: bouquetId
            }
        }).then((bouquet) => {
            return bouquet;
        }).catch((error) => {
            return null;
        });

        return !!(removedImages && removedFlowers && removedBouquet);
    }

    async updateBouquet(bouquet){
        const bouquetExists = await Bouquets.findOne({ where: { product_code: bouquet.product_code } });

        if (!bouquetExists) {
            throw new Error("Bouquet not found");
        }

        return await Bouquets.update(
            {
                name: bouquet.name,
                quantity: bouquet.quantity,
                reorder_level: bouquet.reorderLevel,
                category: bouquet.category,
                sub_category: bouquet.sub_category,
                price: bouquet.price,
                description: bouquet.description,
            },
            {
                where: {
                    product_code: bouquet.product_code
                }
            }
        ).then((updatedBouquet) => {
            return updatedBouquet;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    async getBouquetsByCategory(category){
        const bouquets = await Bouquets.findAll({
            where: {
                category: category
            }
        }).then((bouquets) => {
            return bouquets;
        }).catch((error) => {
            return null;
        })

        if(bouquets){
            for (let bouquet in bouquets){
                const images = await Bouquet_images.findAll({
                    where: {
                        product_code: bouquets[bouquet].dataValues.product_code
                    }
                }).then((images) => {
                    return images;
                }).catch((error) => {
                    return null;
                });

                const flowers = await Bouquet_flowers.findAll({
                    where: {
                        product_code: bouquets[bouquet].dataValues.product_code
                    }
                }).then((flowers) => {
                    return flowers;
                }).catch((error) => {
                    return null;
                });

                bouquets[bouquet].dataValues.images = images;
                bouquets[bouquet].dataValues.flowers = flowers;

            }

            return bouquets;
        }else{
            return null;
        }
    }

    async getBouquetsByPriceRange(minPrice, maxPrice, sub_category){
        const allBouquets = await Bouquets.findAll({
            where: {
                sub_category: sub_category
            }
        }).then((bouquets) => {
            return bouquets;
        }).catch((error) => {
            return null;
        })

        const bouquets = allBouquets.filter((bouquet) => {
            return parseFloat(bouquet.dataValues.price.replace(/,/g, '')) >= parseFloat(minPrice) && parseFloat(bouquet.dataValues.price.replace(/,/g, '')) <= parseFloat(maxPrice);
        })


        if(bouquets){
            for (let bouquet in bouquets){
                const images = await Bouquet_images.findAll({
                    where: {
                        product_code: bouquets[bouquet].dataValues.product_code
                    }
                }).then((images) => {
                    return images;
                }).catch((error) => {
                    return null;
                });

                const flowers = await Bouquet_flowers.findAll({
                    where: {
                        product_code: bouquets[bouquet].dataValues.product_code
                    }
                }).then((flowers) => {
                    return flowers;
                }).catch((error) => {
                    return null;
                });

                bouquets[bouquet].dataValues.images = images;
                bouquets[bouquet].dataValues.flowers = flowers;

            }

            return bouquets;
        }else{
            return null;
        }
    }
}

module.exports = new BouquetService();
