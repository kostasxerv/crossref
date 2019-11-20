const Publication = require('mongoose').model('Publication');
const fetchData = require('./fetchData.js');

module.exports = async function(callback) {
  // get data from API
  const items = (await fetchData()).message.items;

  // prepare the data to store
  const publications = items.map(({ DOI, title, ISSN }) => ({
    doi: DOI,
    title: title.toString(),
    issn: ISSN
  }));

  // save on db
  Publication.insertMany(publications, err => {
    if (err) console.log(err);
    else if (callback) callback();
  });
};
