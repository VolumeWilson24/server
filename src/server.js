require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://WS-time24:ctr00t@cluster0.h30id.mongodb.net/wilsonsons?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes);

app.listen(5000, () => {
    console.log('rodando na porta 5000...');
});