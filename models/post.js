const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/racoon", (err) => {
  if (err) throw err;
  console.log("Successfully connected");
});
const Schema = mongoose.Schema;


const postSchema = new Schema({
  _id: String,
  author: String,
  description: String,
  photoLink: String,
  likes: Array,
  hashtags: Array,
  createdAt: Date,
});


const Post = mongoose.model("User", postSchema);


module.exports = Post;
