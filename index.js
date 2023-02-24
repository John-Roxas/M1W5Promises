const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

let ipAddress;
fetchMyIP((error,ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP: ', ip.ip);
  // Need to access the value in the ip key-value pair
  
  fetchCoordsByIP(ip.ip, ({latitude, longitude}) => {
    console.log({latitude, longitude});
  });
});

