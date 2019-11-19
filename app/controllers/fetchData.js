const https = require('https');

module.exports = function() {
  return new Promise(resolve => {
    https
      .get(process.env.API_URL, response => {
        let data = '';

        // called when a data chunk is received.
        response.on('data', chunk => {
          data += chunk;
        });

        // called when the complete response is received.
        response.on('end', () => {
          data = JSON.parse(data);
          resolve(data);
        });
      })
      .on('error', error => {
        console.log('Error: ' + error.message);
      });
  });
};
