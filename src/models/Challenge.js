const mongoose = require('mongoose');

const Challenge = new mongoose.Schema({
    level: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answers: {
        type: [String, Number],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    boat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boat',
        required: true,
    }]
});

module.exports = mongoose.model('Challenge', Challenge);