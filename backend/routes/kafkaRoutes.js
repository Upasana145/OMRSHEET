const express = require('express');
const { getKafkaResults} = require('../controllers/KafkaResultDataController');
const multer = require('multer');
const router = express.Router(); 
const path = require('path');
 
 
router.post("/results", getKafkaResults);


module.exports = router;
