const request = require("request");

const forecast = (lon, lat, callback) => {
  const url =
    "https://api.weatherbit.io/v2.0/current?lat=" +
    encodeURIComponent(lat) +
    "&lon=" +
    encodeURIComponent(lon) +
    "&key=8ce5d1deb9f74a5ca5b4636f97924f89";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect forecast services!", undefined);
    } else if (body.error) {
      callback("Unable to find the location.", undefined);
    } else {
      callback(undefined, 
       'Relative humidity is ' + body.data[0].rh,
      );
    }
  });
};

module.exports = forecast;
