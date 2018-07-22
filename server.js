const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const passport = require("passport");
require("./config/passport");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_84055qzl:hbdpo8j0vg4bf97hkgun8u6k99@ds137611.mlab.com:37611/heroku_84055qzl");
// mongoose.connect("mongodb://heroku_84055qzl:hbdpo8j0vg4bf97hkgun8u6k99@ds137611.mlab.com:37611/heroku_84055qzl");
mongoose.connect("mongodb://heroku_1r1qq8kw1:hello123@ds143451.mlab.com:43451/heroku_1r1qq8kw");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
