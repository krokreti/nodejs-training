const express = require('express');

const path = require('path')

const mongoose = require('mongoose')

const bodyParser = require('body-parser');

const feedRoute = require('./routes/feed');

const app = express();

app.use(bodyParser.json()) // => application/json
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Authorization", "Content-Type, Authorization") // ou "*"
    res.setHeader("Access-Control-Allow-Headers", "*")
    next();
})

app.use("/feed", feedRoute);

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500;
    const message = error.message;
    // var errorsArray = [];
    // if (error.array) {
    //     errorsArray = error.array
    // }
    res.status(status).json({ message: message })
})

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://krokreti:caramujo123@cluster0.ijzar44.mongodb.net/messages?retryWrites=true&w=majority')
    .then(result => {
        app.listen(8080);
    })
    .catch(
        err => {
            console.log(err)
        }
    )
