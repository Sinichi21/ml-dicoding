const tf = require('@tensorflow/tfjs-node');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const MODEL_BUCKET = process.env.MODEL_BUCKET;
const MODEL_PATH = process.env.MODEL_PATH;
let model;

exports.loadModel = async () => {
  // const [files] = await storage.bucket(MODEL_BUCKET).getFiles({ prefix: MODEL_PATH });
  // const modelFile = files.find(file => file.name.endsWith('model.json'));
  // if (!modelFile) {
  //   throw new Error('Model not found in Cloud Storage');
  // }
  // const modelUrl = `gs://${modelFile.bucket.name}/${modelFile.name}`;
  const modelUrl = MODEL_PATH;
  model = await tf.loadLayersModel(modelUrl);
  console.log('Model loaded successfully');
};

exports.model = model;