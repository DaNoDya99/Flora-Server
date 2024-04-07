const BouquetService = require('../services/bouquet-service');

class BouquetController{
    async addBouquet(req, res){
        try{
            const bouquet = req.body;
            bouquet.images = req.files;
            console.log(bouquet);
            const newBouquet = await BouquetService.addBouquet(bouquet);
            // res.json(newBouquet);
        } catch(e){
            res.status(500).json(e.message);
        }
    }
}

module.exports = new BouquetController();
