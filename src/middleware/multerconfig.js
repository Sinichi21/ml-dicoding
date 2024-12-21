const multer = require('multer');

const upload = multer({
  limits: { fileSize: 1*1024*1024 }, // Maksimum ukuran file 1MB
});

module.exports = { upload };