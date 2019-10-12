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

// and fallback to 4567
const PORT = process.env.PORT || 4567;

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