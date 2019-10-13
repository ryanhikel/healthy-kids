const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: 'anyandeverything',
  resave: false,
  saveUninitialized: true
}));

app.use("/static", express.static("./build/static/"));

app.post('/search-doctors', (request, response) => {
  console.log("hello world")  
  console.log(request);
  console.log("hello world")
})

app.post('/favorite', (request, response) => {
  fetch(`https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=pediatrician&location=48.83901408841116%2C%20-67.23559077109007%2C%2027.726761877858124%2C%20%20-123.48559077109007&skip=0&limit=15&user_key=765d4d94d563c485b63d477fa8644e1d`)

    .then(favorite => response.json(favorite))
})

// and fallback to 5000
const PORT = process.env.PORT || 5000;

// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
  app.get("/*", function (request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// Start the web server listening on the provided port.
app.listen(PORT, () => {
  console.log(`Express web server listening on port ${PORT}`);
});