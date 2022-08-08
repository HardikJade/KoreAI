"use strict";
const express = require('express');
const milkRouter = express.Router();
const milkController = require('./milkController');

milkRouter.get('/:date', (request, response, next) => {
    milkController.checkCapacity(request, response);
});

module.exports = { milkRouter };

