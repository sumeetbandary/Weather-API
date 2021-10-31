const express = require("express");
const https = require("https");
const app = express();
app.use(express.urlencoded({ extended: true }));
const localport = 3000;
//Function to get request from the client
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
	const query = req.body.cityInput;
	const apikey = "d50d34f0829e0f1a0fd79e03de4be065";
	//API url of open weather
	const url =
		"https://api.openweathermap.org/data/2.5/weather?appid=" +
		apikey +
		"&q=" +
		query +
		"&units=metric";
	//function to send request to the open weather
	https.get(url, function (response) {
		response.on("data", function (data) {
			const weatherData = JSON.parse(data); //Conversion of data send by API to JSON format and storing in weatherData
			const temp = weatherData.main.temp; //accessing temp
			const weatherdescription = weatherData.weather[0].description; //accessing weather descriptiop
			const iconcode = weatherData.weather[0].icon; //accessing iconcode
			const imageUrl = "http://openweathermap.org/img/w/" + iconcode + ".png"; //URL of the icon image
			//writing the temperature and weather description to the client
			res.write(
				`<h1>The tempearature in ${query} is ${temp} with the ${weatherdescription}</h1>`
			);
			//writing the icon image to the client
			res.write("<img src=" + imageUrl + ">");
			res.send();
		});
	});
});

app.listen(process.env.PORT || localport, () => {
	console.log("Server started");
});
