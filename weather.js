http = require('http');

const apiKey = 'cacdf29dc2be47d484a105606152306';

let q = process.argv.slice(2);
let temp = '';
let condition = '';
let tomorrowCondition = '';
let tomorrowHigh = '';
let nine = '';
let three = '';
let eight = '';

const getWeather = (q) => {

  http.get('http://api.apixu.com/v1/forecast.json?key='+apiKey+'&q='+q, (res) => {

    let weatherString = '';
    
    // Convert response to string & combine all responses
    res.on('data', (data) => {
      weatherString += data.toString();
    });

    // On end, parse completed string and extract data
    res.on('end', () => {
      let weather = JSON.parse(weatherString);
      temp = weather.current.temp_f;
      condition = weather.current.condition.text;
      tomorrowCondition = weather.forecast.forecastday[0].day.condition.text;
      tomorrowHigh = weather.forecast.forecastday[0].day.maxtemp_f;
      nine = weather.forecast.forecastday[0].hour[10].temp_f;
      three = weather.forecast.forecastday[0].hour[16].temp_f;
      eight = weather.forecast.forecastday[0].hour[21].temp_f;
      console.log("Current temperature: "+temp);
      console.log("Current condition: "+condition);
      console.log("Tomorrow will be "+tomorrowCondition + " with a high of "+tomorrowHigh+":");
      console.log("9am: "+nine);
      console.log("3pm: "+three);
      console.log("8pm: "+eight);
    });
  });
};

getWeather(q);