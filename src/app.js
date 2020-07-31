const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express();
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kavya Shree",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kavya Shree",
  });
});

//app.cpm
//app.com/help
//app.com/about

app.get("/help/*", (req, res) => {
  res.render("error", {
    errorMessage: "Help article not found.",
    title: "404",
    name: "Kavya Shree",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      res.send({
        address: req.query.address,
        location: location,
        forecast: forecastData,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query); //returns the object we searched
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    errorMessage: "Page not found",
    title: "404",
    name: "Kavya Shree",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
