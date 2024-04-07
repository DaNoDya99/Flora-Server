const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/images');
    },
    filename: function (req, file, cb) {
        console.log(path.extname(file.originalname));
        cb(null, Date.now()+'_'+path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;