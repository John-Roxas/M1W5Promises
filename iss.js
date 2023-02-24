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

const fetchCoordsByIP = function (ip, callback) {
  request('http://ipwho.is/' + ip, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // Need to use JSON parse otherwise we get the wrong format!
    const apiOutput = (JSON.parse(body));
    const longitude = apiOutput['longitude'];
    const latitude = apiOutput['latitude'];
    // If we receive an IP, it is assumed that we get nothing as an error!
    console.log (longitude);
    console.log(latitude);
  })
}

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP 
  };