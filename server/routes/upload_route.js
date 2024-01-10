const express = require('express');
const route = express.Router();
const {uploadImages, upload, addProduct} = require('../controllers/upload_controller');

route.post('/images',upload.array('file',2), uploadImages);
route.post('/product', addProduct);

module.exports = route;