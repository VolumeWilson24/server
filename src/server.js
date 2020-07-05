require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();


mongoose.connect('mongodb+srv://WS-time24:ctr00t@cluster0.h30id.mongodb.net/wilsonsons?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Orign', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Conten-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).send({});
    }
    next();
});

app.use((req, res, next) => {
    const error = new Error('Caminho não encontrado');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            menssagem: error.message
        }
    });
});


app.listen(5000, () => {
    console.log('rodando na porta 5000...');
});