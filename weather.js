const getweather = require('./getweather.js');
let q = process.argv.slice(2);

getweather.get(q);