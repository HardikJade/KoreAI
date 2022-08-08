"use strict";
const responseHelper = require('../../utils/responseHelper');
const orderService = require('./ordersService');

module.exports = {
    addOrder: (request, response) => {
        orderService.addOrder(request, (err, data, statusCode) => {
            responseHelper(err, response, data, statusCode);
        });
    },
    updateOrder: (request, response) => {
        orderService.updateOrder(request, (err, data, statusCode) => {
            responseHelper(err, response, data, statusCode);
        });
    },
    updateStatus: (request, response) => {
        orderService.updateStatus(request, (err, data, statusCode) => {
            responseHelper(err, response, data, statusCode);
        });
    },
    deleteOrder: (request, response) => {
        orderService.deleteOrder(request, (err, data, statusCode) => {
            responseHelper(err, response, data, statusCode);
        });
    },

};

