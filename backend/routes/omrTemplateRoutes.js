const express = require('express');
const router = express.Router();
const { getAllTemplates } = require('../controllers/omrTemplateController'); 
router.get('/', getAllTemplates);

module.exports = router;
