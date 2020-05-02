const express = require('express')
const router = express.Router();
const controller = require('./controller');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'static/avatars'),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });

router
    .put('/', controller.editUser)
    .get('/current', controller.getCurrent)
    .post('/uploadImage', upload.single('file'), controller.uploadImage)

module.exports = router
