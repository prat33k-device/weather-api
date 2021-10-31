// jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req, res) {           // first parameter will be same as the form action in html file

    // res.send(req.body.cityName);

    const city = req.body.cityName;
    const unit = "metric";
    const appid = "6f52ba990d4dca3c9a161ff78c8ca330"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=" + unit;
    https.get(url, function(dataFromAPIres){
        // console.log(dataFromAPIres);
        console.log(dataFromAPIres.statusCode);

        dataFromAPIres.on("data", function(data) {
            const weatherData = JSON.parse(data);         // JSON to object and store it in weatherData

            const temp = weatherData.main.temp;
            const dis = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>Weather Status : " + dis + "</p>");
            res.write("<h1>Temperature in " + city + " is " + temp + " celsius</h1>");
            res.write("<image src=" + iconUrl + ">");
            res.send();
            // console.log(weatherData);
        });
        
    });

});

app.listen(3000, function () {
    console.log("Server is running at port 3000");
});





    