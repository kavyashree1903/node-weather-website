const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoia2F2eWFtYWlsbWUxMDAxIiwiYSI6ImNrY3RrYWcwYjFsc2YyeHQ2bzU2c3lkNHEifQ.8-mZQTvPqLp7cZqZveMxiQ&limit=1";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to the internet", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
 