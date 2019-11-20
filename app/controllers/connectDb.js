const mongoose = require('mongoose');

module.exports = function connect() {
  // attach the handlers on connection events
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', clearDB);

  // create the connection to db
  return mongoose.connect(process.env.MONGODB_URL, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

function clearDB() {
  // clean publications on db at open
  mongoose.connection.db.dropCollection('publications', _ => {});
}
