const { model } = require('../services/modelService');
const { savePrediction } = require('../services/firestoreService');
const { generateResponse, generateError } = require('../utils/responseUtils');
const tf = require('@tensorflow/tfjs-node');
const { v4: uuidv4 } = require('uuid');

exports.predict = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(generateError('Image is required'));
    }

    const buffer = req.file.buffer;

    // Decode dan preprocess gambar
    const imageTensor = tf.node.decodeImage(buffer, 3)
      .resizeBilinear([224, 224])
      .expandDims(0)
      .toFloat()
      .div(255.0);

    // Lakukan prediksi
    const predictions = await model.predict(imageTensor).data();
    const score = predictions[0];
    const result = score > 0.5 ? 'Cancer' : 'Non-cancer';
    const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';
    const id = uuidv4();
    const createdAt = new Date().toISOString();

    // Simpan ke Firestore
    await savePrediction({ id, result, suggestion, createdAt });

    res.json(generateResponse({ id, result, suggestion, createdAt }));
  } catch (error) {
    if (error.message.includes('Payload content length')) {
      return res.status(413).json(generateError('Payload content length greater than maximum allowed: 1000000', 413));
    }

    res.status(400).json(generateError('Terjadi kesalahan dalam melakukan prediksi', 400));
  }
};
