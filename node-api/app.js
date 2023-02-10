const express = require('express');

const bodyParser = require('body-parser');

const feedRoute = require('./routes/feed');

const app = express();

app.use(bodyParser.json()) // => application/json

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Authorization", "Content-Type, Authorization") // ou "*"
    next();
})

app.use("/feed", feedRoute);

app.listen(3001);