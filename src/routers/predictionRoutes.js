const express = require('express');
const { upload } = require('../middleware/multerconfig');
const { predict } = require('../controllers/predictionController');

const router = express.Router();

// Rute untuk prediksi
router.post('/predict', upload.single('image'), predict);

module.exports = router;
