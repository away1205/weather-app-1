const express = require('express');
const https = require('https')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
  const city = req.body.cityName

  const q = city;
  const appid = '282524bc30627d057cda07f56c24325f'
  const units = 'metric'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}&units=${units}`;

  https.get(url, (response) => {
    console.log(response.statusCode)

    response.on('data', (data) => {
      const weatherObj = JSON.parse(data);
      const weTemp = weatherObj.main.temp;
      const weName = weatherObj.name;
      const weDesc = weatherObj.weather[0].description;
      const weIcon = weatherObj.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${weIcon}@2x.png`
      res.write(`<h1>The temperature in ${weName} is ${weTemp} Celcius</h1>`);
      res.write(`<p>The weather is currently ${weDesc}</p>`);
      res.write(`<img src="${iconURL}">`)
      res.send();
    });
  });
})

app.listen(3000, () => {
  console.log('running in 3000')
})