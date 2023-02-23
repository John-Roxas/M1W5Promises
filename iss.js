const request = require('request');

const fetchMyIP = function(callback) {
  
  // It is important that the order of the callback function in request is in the RIGHT ORDER.
  request('https://api.ipify.org?format=json', (error, response, body) => {
    
    // If we receive an error, it is assumed that we get nothing for an IP!
    if (error) {
      return callback(error, null);
    }
    // Need to use JSON parse otherwise we get the wrong format!
    const ip = JSON.parse(body);
    // If we receive an IP, it is assumed that we get nothing as an error!
    if (ip) {
      return callback(null, ip);
    }
  });
};

module.exports = { fetchMyIP };