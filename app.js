/* eslint-disable object-shorthand */
const express = require("express");

const app = express();
const multer = require("multer");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const upload = multer();
const bodyParser = require("body-parser");
const fs = require("fs");
const posts = require("./server/photoPostServ.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const User = require("./models/user_m.js");
// const Post = require("./models/post.js");


passport.use(new LocalStrategy(((username, password, done) => {
  const user = { username: username };
  const userA = { username: username, password: password };
  const makeRequest = async () => {
    const users = await User.validateUser(userA);
    if (users.length === 0) {
      User.addUser(userA);
      done(null, user);
    } else {
      const user3 = await User.comparePass(userA, users[0]);
      if (user3) {
        done(null, user);
      } else done(null, false, { message: "Неверный пароль." });
    }
  };
  makeRequest().catch(() => {
    done(null, false);
  });
})));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use(cookieParser());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/post", (req, res) => {
  if (req.user) {
    const post = posts.getPhotoPost(req.query.id);
    if (post !== undefined) {
      res.send(post);
      res.status(200).end();
    } else res.status(404).end();
  } else res.status(404).end();
});
app.get("/postIndex", (req, res) => {
  const index = posts.getPhotoPostIndex(req.query.id);
  if (index !== undefined) {
    res.send(String(index));
    res.status(200).end();
  } else res.status(404).end();
});
app.get("/postByIndex", (req, res) => {
  if (req.user) {
    const post = posts.getPhotoPostByIndex(req.query.id);
    if (post !== undefined) {
      res.send(post);
      res.status(200).end();
    } else res.status(404).end();
  } else res.status(404).end();
});
app.get("/likes", (req, res) => {
  const like = posts.numbLikes(req.query.id);
  res.send(String(like));
  res.status(200).end();
});
app.get("/addLike", (req, res) => {
  if (req.user) {
    const like = posts.addLike(req.query.id, req.query.user);
    posts.writeF();
    res.send(String(like));
    res.status(200).end();
  } else res.status(404).end();
});
app.get("/size", (req, res) => {
  const size = posts.getArSize();
  res.send(String(size));
  res.status(200).end();
});
app.post("/posts", (req, res) => {
  let f;
  if (req.body.filter !== undefined) {
    f = JSON.parse(req.body.filter, (key, value) => {
      if (key === "createdAt") return new Date(value);
      return value;
    });
  }
  const post = posts.getPhotoPosts(req.body.skip, req.body.top, f);
  if (post !== undefined) {
    res.send(post);
    res.status(200).end();
  } else res.status(404).end();
});
app.post("/post", (req, res) => {
  if (req.user) {
    if (posts.addPhotoPost({
      id: req.body.id,
      author: req.body.author,
      createdAt: req.body.createdAt,
      description: req.body.description,
      photoLink: req.body.photoLink,
      hashtags: req.body.hashtags,
      likes: req.body.likes,
    })) {
      posts.writeF();
      res.status(200).end();
    } else res.status(404).end();
  } else res.status(404).end();
});
app.post("/uploadImage", upload.single("file"), (req, res) => {
  if (req.user) {
    fs.writeFile(`public/${req.file.originalname}`, req.file.buffer);
    res.status(200).end();
  } else res.status(404).end();
});
app.delete("/post", (req, res) => {
  if (req.user) {
    const deleted = posts.removePhotoPost(req.query.id);
    if (deleted) {
      posts.writeF();
      res.status(200).end();
    } else res.status(404).end();
  } else res.status(404).end();
});
app.put("/post", (req, res) => {
  if (req.user) {
    if (posts.editPhotoPost(req.body.id, req.body.post)) {
      posts.writeF();
      res.status(200).end();
    } else res.status(404).end();
  } else res.status(404).end();
});


app.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user.username);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(404).end();
}
app.get("/login", ensureAuthenticated, (req, res) => {
  res.send(req.user.username);
});
app.get("/logout", (req, res) => {
  req.logout();
  res.end();
});


app.listen("3000", () => {
  console.log("Server is running");
});
