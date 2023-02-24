const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  return request('http://ipwho.is/' + JSON.parse(body).ip);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body)=> {
      const {response} = JSON.parse(body);
      return response;
    })
  // console.log(JSON.parse(body));
  ;
};

const print = function(array) {
  array.forEach(element => {
    const datetime = new Date(0);
    datetime.setUTCSeconds(element.risetime);
    const duration = element.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  });
};
module.exports = {
  nextISSTimesForMyLocation,
  print
};

// Copy and paste from iss.js
// const fetchMyIPOld = function(callback) {
//
//   // It is important that the order of the callback function in request is in the RIGHT ORDER.
//   request('https://api.ipify.org?format=json', (error, response, body) => {
//
//     // If we receive an error, it is assumed that we get nothing for an IP!
//     if (error) {
//       return callback(error, null);
//     }
//     // Need to use JSON parse otherwise we get the wrong format!
//     const ip = JSON.parse(body);
//     // If we receive an IP, it is assumed that we get nothing as an error!
//     if (ip) {
//       return callback(null, ip);
//     }
//   });
// };