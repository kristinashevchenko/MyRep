const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require("express");
let app = express();
app.use(express.static('public'));
const server = http.createServer((req, res) => {

});

server.listen('3000', () => {
    console.log('Server is running');
});