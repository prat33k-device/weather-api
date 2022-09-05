// jshint esversion:6
require('dotenv').config()
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
    const appid = process.env.API_KEY;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=" + unit;
    https.get(url, function(dataFromAPIres){
        // console.log(dataFromAPIres);
        console.log(dataFromAPIres.statusCode);

        dataFromAPIres.on("data", function(data) {
            const weatherData = JSON.parse(data);         // JSON to object and store it in weatherData
            if(weatherData.cod === 200) {
                const temp = weatherData.main.temp;
                const dis = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                res.write("<p>Weather Status : " + dis + "</p>");
                res.write("<h1>Temperature in " + city + " is " + temp + " celsius</h1>");
                res.write("<image src=" + iconUrl + ">");
                res.send();
            }else {
                res.send("<h1>City Not Found..!</h1>")
            }
            
            console.log(weatherData);
        });
        
    });

});

app.listen(3000, function () {
    console.log("Server is running at port 3000");
});





    