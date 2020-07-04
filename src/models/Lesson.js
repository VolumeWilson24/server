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
        type: Number,
        required: true
    },
    boat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boat',
        required: true,
    }]
});

module.exports = mongoose.model('Lesson', LessonSchema);