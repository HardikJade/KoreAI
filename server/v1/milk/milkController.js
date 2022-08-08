"use strict";
const responseHelper = require('../../utils/responseHelper');
const milkService = require('./milkService');

module.exports = {
    checkCapacity: (request, response) => {
        milkService.checkCapacity(request, (err, data, statusCode) => {
            responseHelper(err, response, data, statusCode);
        });
    },

};
