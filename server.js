const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json()
const exerciseRoute = require('./routes/exercises');
const userRoute = require('./routes/user')
require('dotenv').config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb connection established")
})
const app = express();
const port = process.env.PORT || 5000;
app.use('/exercises', bodyParser, exerciseRoute);
app.use('/users', bodyParser, userRoute);
app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`server is running on port : ${port}`)
});