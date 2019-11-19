// load env variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { join } = require('path');
const { Publication } = require(join(__dirname, 'app/models/publication.js'));
const fetchData = require(join(__dirname, 'app/controllers/fetchData.js'));

const port = process.env.PORT || 3005;
const app = express();

function listen() {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}

function clearDB() {
  // clean publications on db at open
  mongoose.connection.db.dropCollection('publications', (err, result) => {
    if (err) console.log('Publications on DB NOT cleared');
    if (result) console.log('Publications on DB cleared');
  });
}

function connect() {
  // attach the handlers on connection events
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', clearDB)
    .once('open', listen);

  // create the connection to db
  return mongoose.connect(process.env.MONGODB_URL, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

app.get('/publications', async (req, res) => {
  // query params { limit, offset }
  const { limit, offset } = req.query;

  try {
    // call the list static method of the collection
    const publications = await Publication.list({
      limit: parseInt(limit) || 20,
      offset: parseInt(offset) || 0
    });

    // set the headers for json
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ publications }));
  } catch (err) {
    // handle the error
    res.status(err.status || 500).send({
      message: err.message,
      error: err
    });
  }
});

const init = async function() {
  // get publications from API
  const data = await fetchData();
  const items = data.message.items;

  // connect to db
  connect();

  // prepare the data to store
  const publications = items.map(({ DOI, title, ISSN }) => ({
    doi: DOI,
    title: title.toString(),
    issn: ISSN
  }));

  // save on db
  Publication.insertMany(publications, err => {
    if (err) console.log(err);
  });
};

init();
