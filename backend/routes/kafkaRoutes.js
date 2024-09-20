const express = require('express');
const { getKafkaResults} = require('../controllers/KafkaResultDataController');
const multer = require('multer');
const router = express.Router(); 
const path = require('path');
 
 
router.get("/results", getKafkaResults);


module.exports = router;
