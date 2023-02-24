const {fetchMyIP} = require('./iss_promised');
const {fetchCoordsByIP} = require('./iss_promised');
const {print} = require('./iss_promised');
const {nextISSTimesForMyLocation} = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((result) => {
    print(result);
  })
  .catch((error) => {
    console.log("There's an error",error.message);
  });