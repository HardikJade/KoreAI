const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const milkConfig = require('./milkConfig.json');
const Milk = new Schema({
    date: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    capacity: {
        type: mongoose.Schema.Types.Number,
        default: milkConfig.defaultCapacity,
        required: true
    }
}, { timestamps: true });
const Feed_Polls = mongoose.model('Milk', Milk, 'Milk');
module.exports = Feed_Polls;