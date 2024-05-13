const BouquetService = require('../services/bouquet-service');

class BouquetController{
    async addBouquet(req, res){
        try{
            const bouquet = req.body;
            bouquet.images = req.files;
            const newBouquet = await BouquetService.addBouquet(bouquet);
            if(newBouquet){
                res.status(201).json({ status: "success", message: "Bouquet Added Successfully"});
            }else{
                res.status(500).json({ status: "success", message: "An error occurred"});
            }
        } catch(e){
            res.status(500).json(e.message);
        }
    }

    async getBouquets(req,res) {
        try{
            const bouquets = await BouquetService.getBouquets();
            if(bouquets){
                res.status(200).json({ status: "success", message: "Bouquets fetched successfully", bouquets: bouquets});
            }else{
                res.status(500).json({ status: "success", message: "An error occurred", bouquets: []})
            }
        }catch (e){
            res.status(500).json(e.message);
        }
    }

    async removeBouquet(req, res){
        try{
            const bouquetId = req.params.id;
            const deletedBouquet = await BouquetService.removeBouquet(bouquetId);
            if(deletedBouquet){
                res.status(200).json({ status: "success", message: "Bouquet deleted successfully"});
            }else{
                res.status(500).json({ status: "success", message: "An error occurred"});
            }
        } catch(e){
            res.status(500).json(e.message);
        }
    }

    async updateBouquet(req, res){
        try{
            const bouquet = req.body;
            bouquet.images = req.files;
            const updatedBouquet = await BouquetService.updateBouquet(bouquet);
            if(updatedBouquet){
                res.status(200).json({ status: "success", message: "Bouquet Updated Successfully"});
            }else{
                res.status(500).json({ status: "success", message: "An error occurred"});
            }
        } catch(e){
            res.status(500).json(e.message);
        }
    }
}

module.exports = new BouquetController();
