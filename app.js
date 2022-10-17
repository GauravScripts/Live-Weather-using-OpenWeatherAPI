const express = require("express");
const app = express();
const https = require("https");
app.get("/", function(req, response){
    const url ="https://api.openweathermap.org/data/2.5/weather?q=Alwar,In&appid=158bf4aad8af166eb7df6b5285c91226&units=metric"
    https.get(url,function(res){
        console.log(res.statusCode,res.statusMessage);
        res.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherD = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+ icon+"@2x.png"
            response.write("<p>The weather description has been updated "+weatherD+" and</p>");
            response.write("<h1>The temperature in alwar is " + temp+" degrees</h1>")
            response.write("<img src="+imageURL+">")
            response.send();            
        })
    })
}
);


});
app.post("/", function (req, response) {
    
    const query = req.body.cityName;
    const apikey = "158bf4aad8af166eb7df6b5285c91226";
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

app.listen(3000,function(){
    console.log("listening on port 3000");})