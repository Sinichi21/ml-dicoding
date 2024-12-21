// Load model dari Google Cloud Storage
const MODEL_BUCKET = 'your-model-bucket-name';
const MODEL_PATH = 'path/to/model';
let model;

async function loadModel() {
  const [files] = await storage.bucket(MODEL_BUCKET).getFiles({ prefix: MODEL_PATH });
  const modelFile = files.find(file => file.name.endsWith('model.json'));
  if (!modelFile) {
    throw new Error('Model not found in Cloud Storage');
  }
  const modelUrl = `gs://${modelFile.bucket.name}/${modelFile.name}`;
  model = await tf.loadGraphModel(modelUrl);
  console.log('Model loaded successfully');
}