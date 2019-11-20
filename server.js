// load env variables
require('dotenv').config();

require('./app/models/publication');
const express = require('express');
const connect = require('./app/controllers/connectDb');
const AttachRoutes = require('./app/controllers/routes');
const saveData = require('./app/controllers/saveData');

const app = express();

AttachRoutes(app);

const port = process.env.PORT || 3005;
app.listen(port);
console.log('Express app started on port ' + port);

// connect on db
connect();

if (process.env.NODE_ENV === 'development') {
  // save data from API
  saveData();
}

module.exports = app;
