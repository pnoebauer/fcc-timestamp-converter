// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// date provided in query parameter
// 1-) It should handle a valid date, and return the correct unix timestamp
// 2-) It should handle a valid date, and return the correct UTC string
// 3-) It should handle a valid unix date, and return the correct unix timestamp
// 4-) It should return the expected error message for an invalid date
// 5-) It should handle an empty date parameter, and return the current time in unix format
// 6-) It should handle an empty date parameter, and return the current time in UTC format

const validUnixDate = dateString => {
  // if the dateString returns an invalid date, then the dateString is of unix format and needs to be converted to a number
  // return Object.is(new Date(dateString).getTime(), NaN);

  return Object.is(new Date(dateString).getTime(), NaN) && !Object.is(new Date(Number(dateString)).getTime(), NaN);
}

const validDate = dateString => {
  return !Object.is(new Date(dateString).getTime(), NaN);
}

app.get("/api/:dateString", function (req, res) {
  const {dateString} = req.params;

  if(validUnixDate(dateString)) {
    const unixDateTime = Number(dateString);
    const utcDateTime = new Date(unixDateTime).toUTCString();

    return res.json({unix: unixDateTime, utc: utcDateTime});
  } else if(validDate(dateString)) {
    const unixDateTime = new Date(dateString).getTime();
    const utcDateTime = new Date(dateString).toUTCString();

    return res.json({unix: unixDateTime, utc: utcDateTime});
  } 
  
  return res.json({error: "Invalid Date"})
});

app.get("/api", function (req, res) {
  
  const unixDateTime = new Date().getTime();
  const utcDateTime = new Date().toUTCString();

  return res.json({unix: unixDateTime, utc: utcDateTime});

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
