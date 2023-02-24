const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error ,result) => {
  if (error) {
    console.log("Ran into an error while determining next ISS Times for my Location");
  }
  result.forEach(element => {
    const datetime = new Date(0);
    datetime.setUTCSeconds(element.risetime);
    const duration = element.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  });
});