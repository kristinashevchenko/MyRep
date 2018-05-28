const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb://localhost/racoon", (err) => {
  if (err) throw err;
  console.log("Successfully connected");
});
const User = require("./user.js");

exports.getUser = function (id) {
  return User.findById(id, (err, author) => {
    if (err) throw err;
    return author;
  });
};
exports.comparePass = function (user, users) {
  return bcrypt.compareSync(user.password, users.password);
};
exports.validateUser = function (user) {
  return User.find({ username: user.username }, (err, users) => {
    if (err) { console.log("I'm here"); return err; }
    console.log(users.length);
    if (users.length === 0) { return true; }
    return false;
  });
};
exports.addUser = function (user) {
  const salt = bcrypt.genSaltSync(10);
  const pas = bcrypt.hashSync(user.password, salt);
  const user2 = new User({
    username: user.username,
    password: pas,
    _id: new mongoose.Types.ObjectId(),
  });
  user2.save((err) => {
    if (err) {
      console.log("Not added");
      return err;
    }
    console.log("Added!"); return true;
  });

  return true;
};

