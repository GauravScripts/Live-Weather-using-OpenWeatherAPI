var express = require("express");
var app = express();
var https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, response) {
    response.sendFile(__dirname + "/index.html");

});
app.post("/", function (req, response) {
    
    const query = req.body.cityName;
    //Add API key to request
    const apikey = "[API key]";
    const unit ="metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url, function (res) {
        console.log(res.statusCode, res.statusMessage);
        res.on("data", function (data) {
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var weatherD = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            response.write("<p>The weather description has been updated " + weatherD + " and</p>");
            response.write("<h1>The temperature in "+query+" is " + temp + " degrees</h1>");
            response.write("<img src=" + imageURL + ">");
            response.send();
        });
    });
});
app.listen(3000, function () {
    console.log("listening on port 3000");
});
