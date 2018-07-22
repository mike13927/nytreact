const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://heroku_1r1qq8kw1:hello123@ds143451.mlab.com:43451/heroku_1r1qq8kw"
);

const userSeed = [
      {email: "abc@acme.com",
       name: "John School"}
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
