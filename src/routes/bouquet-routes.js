const express = require('express');
const router = express.Router();
const BouquetController = require('../controllers/bouquet-controller');
const upload = require('../middlewares/multer');

router.route('/add-bouquet').post(upload.array('images',5),BouquetController.addBouquet);
router.route('/get-bouquets').get(BouquetController.getBouquets);
router.route('/remove-bouquet/:id').delete(BouquetController.removeBouquet);
router.route('/update-bouquet').put(upload.array('images',5),BouquetController.updateBouquet);

module.exports = router;
