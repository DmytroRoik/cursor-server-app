const express = require('express')
const router = express.Router();

const controller = require('./controller');

router
    .get('/', controller.getAll)
    .post('/', controller.createCategory)
    .put('/', controller.editCategory)
    .delete('/?', controller.removeCategory)

module.exports = router
