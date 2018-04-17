const express = require("express");
const multer = require("multer");
const upload = multer();
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
app.use(bodyParser.json());

let posts = require('./server/photoPostServ.js');
app.use(express.static('public'));
app.listen('3000', () => {
    console.log('Server is running');
});
app.get('/post', (req, res) => {
    let post = posts.getPhotoPost(req.query.id);
    if (post !== undefined) {
        res.send(post);
        res.status(200).end();
    }
    else res.status(404).end();
});
app.get('/postIndex', (req, res) => {
    let post = posts.getPhotoPostIndex(req.query.id);
    if (post !== undefined) {
        res.send(String(post));
        res.status(200).end();
    }
    else res.status(404).end();
});
app.get('/postByIndex', (req, res) => {
    let post = posts.getPhotoPostByIndex(req.query.id);
    if (post !== undefined) {
        res.send(post);
        res.status(200).end();
    }
    else res.status(404).end();
});
app.get('/likes', (req, res) => {
    {
        let len = posts.numbLikes(req.query.id);
        res.send(String(len));
        res.status(200).end();
    }

});
app.get('/addLike', (req, res) => {
    {
        let len = posts.addLike(req.query.id, req.query.user);
        posts.writeF();
        res.send(String(len));
        res.status(200).end();
    }

});
app.get('/size', (req, res) => {
    {
        let len = posts.getArSize();
        res.send(String(len));
        res.status(200).end();
    }

});
app.post('/posts', (req, res) => {
    let f;
    if (req.body.filter !== undefined)
        f = JSON.parse(req.body.filter, function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
    let post = posts.getPhotoPosts(req.body.skip, req.body.top, f);
    if (post !== undefined) {
        res.send(post);
        res.status(200).end();
    }
    else res.status(404).end();
});
app.post('/post', (req, res) => {
    if (posts.addPhotoPost({
        id: req.body.id,
        author: req.body.author,
        createdAt: req.body.createdAt,
        description: req.body.description,
        photoLink: req.body.photoLink,
        hashtags: req.body.hashtags,
        likes: req.body.likes
    })) {
        posts.writeF();
        res.status(200).end();
    }
    else res.status(404).end();
});
app.post('/uploadImage', upload.single('file'), (req, res) => {
    fs.writeFile("public/" + req.file.originalname,
        req.file.buffer);
    res.status(200).end();
});
app.delete('/post', (req, res) => {
    let post = posts.removePhotoPost(req.query.id);
    if (post) {
        posts.writeF();
        res.status(200).end();
    }
    else res.status(404).end();
});
app.put('/post', (req, res) => {
    if (posts.editPhotoPost(req.body.id, req.body.post)) {
        posts.writeF();
        res.status(200).end();
    }
    else res.status(404).end();
});