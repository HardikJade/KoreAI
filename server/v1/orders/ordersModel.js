const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderConfig = require('./orderConfig.json')
const Order = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        trim: true,
        maxLength: [100, 'Please limit the name to 100 characters'],
        required: true
    },
    address: {
        type: mongoose.Schema.Types.String,
        maxLength: [500, 'Please limit the name to 500 characters'],
        required: true
    },
    date: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    capacity: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    status: {
        type: mongoose.Schema.Types.String,
        enum: orderConfig.orderStatus.values,
        default: orderConfig.orderStatus.default
    }
}, { timestamps: true });
const Orders = mongoose.model('Order', Order, 'Order');
module.exports = Orders;