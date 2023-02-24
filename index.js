const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error,ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP: ', ip.ip);
  // Need to access the value in the ip key-value pair
  
  fetchCoordsByIP(ip.ip, (error, coords) => {
    if (error) {
      console.log("Ran into an error while determining location", error);
      return;
    }
    
    console.log("Location is:", coords);
    fetchISSFlyOverTimes(coords, (error, result) => {
      if (error) {
        console.log("Error in determining ISS flyover times!", error);
      }
      console.log("ISS Flyover times are:", result);
      return;
    });
  });
});