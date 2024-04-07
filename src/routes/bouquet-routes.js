const express = require('express');
const router = express.Router();
const BouquetController = require('../controllers/bouquet-controller');
const upload = require('../middlewares/multer');

router.route('/add-bouquet').post(upload.array('images',5),BouquetController.addBouquet);

module.exports = router;
