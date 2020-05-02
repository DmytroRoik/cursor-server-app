const express = require('express')
const server = express();
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');

const categories = require('./routes/categories');
const charges = require('./routes/charges');
const icons = require('./routes/icons');
const stats = require('./routes/stats');
const users = require('./routes/users');

const swaggerDocument = require('./api-docs/swagger.json');
// Middleware

server.use(express.urlencoded({extended: true}))
      .use(bodyParser.urlencoded({ extended: false }))
      .use(bodyParser.json())
      .use(cors())
      .use(express.static('static'));
// Routes
server.use('/categories', categories)
  .use('/charges', charges)
  .use('/icons', icons)
  .use('/stats', stats)
  .use('/users', users)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = server
