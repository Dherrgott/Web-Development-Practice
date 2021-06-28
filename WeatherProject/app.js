const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "9325163b58cd8371393359dae138c35f";
  const unit = "metric";
  const kitchenerWeather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(kitchenerWeather, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      const weatherTemp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const imageURL =
        "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          weatherTemp +
          " degrees Celcius.</h1>"
      );
      res.write(
        "<h1> The weather is currently " + weatherDescription + "</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

// const query = "Kitchener";
// const apiKey = "9325163b58cd8371393359dae138c35f";
// const unit = "metric";
// const kitchenerWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

// https.get(kitchenerWeather, function (response) {
//   console.log(response.statusCode);

//   response.on("data", function (data) {
//     const weatherData = JSON.parse(data);

//     const weatherTemp = weatherData.main.temp;
//     const weatherDescription = weatherData.weather[0].description;
//     const weatherIcon = weatherData.weather[0].icon;
//     const imageURL =
//       "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
//     res.write(
//       "<h1>The temperature in Kitchener is " +
//         weatherTemp +
//         " degrees Celcius.</h1>"
//     );
//     res.write(
//       "<h1> The weather is currently " + weatherDescription + "</h1>"
//     );
//     res.write("<img src=" + imageURL + ">");
//     res.send();
//   });
// });

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
