const express = require('express');
const router = express.Router();
const evaluateController = require('../controllers/EvaluateController');

router.get('/get-all/:id', evaluateController.getEvaluate);
router.post('/send', evaluateController.sendEvaluate);

module.exports = router;
