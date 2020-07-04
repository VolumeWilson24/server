const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registry: {
        type: String,
        unique: true,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    level: {
        type: String,
        default: 'Iniciante',
    },
    points: {
        type: Number,
        default: 0
    },
    boats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boat'
    }],
    photo_url: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);