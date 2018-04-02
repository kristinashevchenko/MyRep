const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

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
app.post('/posts', (req, res) => {
    let post = posts.getPhotoPosts(req.body.skip,req.body.top,req.body.filter);
    if (post !== undefined) {
        res.send(post);
        res.status(200).end();
    }
    else res.status(404).end();
});
app.post('/post', (req, res) => {
    if(posts.addPhotoPost({id:req.body.id,author:req.body.author,createdAt:new Date(req.body.createdAt),description:req.body.description,
    photoLink:req.body.photoLink,hashtags:req.body.hashtags,likes:req.body.likes}))
    {
        posts.writeF();
        res.status(200).end();
    }
    else res.status(404).end();
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
    if(posts.editPhotoPost(req.body.id,{description:req.body.description,
        photoLink:req.body.photoLink,hashtags:req.body.hashtags,likes:req.body.likes}))
    {
        posts.writeF();
        res.status(200).end();
    }
    else res.status(404).end();
});