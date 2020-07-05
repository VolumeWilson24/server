const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    boat: [{
        type: String,
        required: true,
    }]
});

module.exports = mongoose.model('Lesson', LessonSchema);