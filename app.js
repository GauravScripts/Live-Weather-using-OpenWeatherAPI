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




app.listen(3000,function(){
    console.log("listening on port 3000");})