const Article = require('mongoose').model('Article');
const fetchData = require('./fetchData.js');

module.exports = async function(callback) {
  // get data from API
  const items = (await fetchData()).message.items;

  // prepare the data to store
  const articles = items.map(({ DOI, title, ISSN }) => ({
    doi: DOI,
    title: title.toString(),
    issn: ISSN
  }));

  // save on db
  Article.insertMany(articles, err => {
    if (err) console.log(err);
    else if (callback) callback();
  });
};
