const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/', // Change this to your desired upload directory
  filename: (req, file, cb) => {
    cb(null, `<span class="math-inline">\{Date\.now\(\)\}\-</span>{file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
