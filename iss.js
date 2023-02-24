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

const fetchCoordsByIP = function(ip, callback) {
  request('http://ipwho.is/' + ip, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // Need to use JSON parse otherwise we get the wrong format!
    const apiOutput = (JSON.parse(body));
    const longitude = apiOutput['longitude'];
    const latitude = apiOutput['latitude'];
    const result = {
      latitude,
      longitude
    };
    callback(null, result);
    
    // If we receive an IP, it is assumed that we get nothing as an error!
    
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request('https://iss-flyover.herokuapp.com/json/?lat=' + coords.latitude + '&lon=' + coords.longitude, (error, response, body) => {
    console.log();
    if (error) {
      return callback(error, null);
    }

    callback(null,JSON.parse(body).response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }

    // console.log('It worked! Returned IP: ', ip.ip);
    // Need to access the value in the ip key-value pair
  
    fetchCoordsByIP(ip.ip, (error, coords) => {
      if (error) {
        console.log("Ran into an error while determining location", error);
        return;
      }
    
      // console.log("Location is:", coords);
      fetchISSFlyOverTimes(coords, (error, result) => {
        if (error) {
          console.log("Error in determining ISS flyover times!", error);
        }
        // console.log("ISS Flyover times are:", result);
        callback(null, result);
      });
    });
  });
};
module.exports = {
  nextISSTimesForMyLocation
};