const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: [true, "error"] },
  username: { type: String, required: [true, "error"], unique: true },
  password: { type: String, required: [true, "error"] },
});
userSchema.plugin(uniqueValidator, { message: "already exists" });

const User = mongoose.model("User", userSchema);
module.exports = User;
