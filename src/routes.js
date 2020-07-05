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
routes.get('/users', UserController.show);
routes.post('/signin', UserController.login);
routes.put('/photo/:reg', image.single('photo'), UserController.updatePhoto);

//BOAT
routes.post('/boats', image.single('image'), BoatController.store);
routes.get('/boats', BoatController.show);

//LESSON
routes.post('/lessons', video.single('video'), LessonController.store);
routes.get('/lessons', LessonController.show);

module.exports = routes;