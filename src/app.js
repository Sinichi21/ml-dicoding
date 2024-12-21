const express = require('express');
const { loadModel } = require('./services/modelService');
const predictionRoutes = require('./routers/predictionRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Gunakan rute prediksi
app.use('/', predictionRoutes);

loadModel()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to load model:', err);
  });
