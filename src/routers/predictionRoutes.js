const express = require('express');
const { upload } = require('../middlewares/multerConfig');
const { predict } = require('../controllers/predictionController');

const router = express.Router();

// Rute untuk prediksi
router.post('/predict', upload.single('image'), predict);

module.exports = router;
