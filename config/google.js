const { Storage } = require('@google-cloud/storage');
const { Firestore } = require('@google-cloud/firestore');

// Konfigurasi Google Cloud
const storage = new Storage();
const firestore = new Firestore();