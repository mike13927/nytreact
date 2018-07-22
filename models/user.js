const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const crypto = require("crypto");
const mongoDB = process.env.MONGODB;

mongoose.connect(mongoDB);
mongoose.connection.on("error", err => {
  console.error(err.message);
});

const validateEmail = email => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Required!"],
    validate: [validateEmail, "Invalid address!"],
    maxlength: [50, "Too Long!"],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, "Required!"],
    maxlength: [50, "Too Long!"],
    trim: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
