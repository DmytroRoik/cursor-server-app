const express = require('express')
const router = express.Router()
const controller = require('./controller');


router
    .get('/?', controller.getAll)
    .post('/', controller.createCharge)
    .put('/', controller.editCharge)
    .delete('/?', controller.removeCharge)

module.exports = router
