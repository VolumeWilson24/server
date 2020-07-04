const express = require('express');
const multer = require('multer');
const UserController = require('./controllers/UserController');
const BoatController = require('./controllers/BoatController');
const LessonController = require('./controllers/LessonController');
const routes = express.Router();
const uploadImages = require('./upload/uploadImages');
const uploadVideos = require('./upload/uploadVideos');

const image = multer(uploadImages);
const video = multer(uploadVideos);

//USER
routes.post('/users', UserController.store);
routes.post('/signin', UserController.login);
routes.put('/photo/:reg', image.single('photo'), UserController.updatePhoto);

//BOAT
routes.post('/boats', image.single('image'), BoatController.store);
routes.get('/boats', BoatController.show);

//LESSON
routes.post('/lessons', video.single('video'), LessonController.store);
routes.get('/lessons', LessonController.show);

routes.use((req, res, next) => {
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
})

routes.use((req, res, next) => {
    const error = new Error('Caminho não encontrado');
    error.status = 404;
    next(error);
});

routes.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        erro: {
            menssagem: error.message
        }
    });
});

module.exports = routes;