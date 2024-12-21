const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();
const COLLECTION_NAME = process.env.COLLLECTION_NAME;

exports.savePrediction = async ({ id, result, suggestion, createdAt }) => {
  await firestore.collection(COLLECTION_NAME).doc(id).set({
    id,
    result,
    suggestion,
    createdAt,
  });
};
