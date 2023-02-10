const express = require('express');

const bodyParser = require('body-parser');

const feedRoute = require('./routes/feed');

const app = express();

app.use(bodyParser.json()) // => application/json

app.use("/feed", feedRoute);

app.listen(3001);