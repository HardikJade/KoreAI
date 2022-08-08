"use strict";
const express = require('express');
const orderRouter = express.Router();
const orderController = require('./ordersController');
const isMilkAvailable = require('../../utils/middleware').isMilkAvailable;
const canUpdate = require('../../utils/middleware').canUpdate;

orderRouter.post('/add', [isMilkAvailable], (request, response, next) => {
    orderController.addOrder(request, response);
});

orderRouter.put('/update/:id', [canUpdate], (request, response, next) => {
    orderController.updateOrder(request, response);
});

orderRouter.put('/updateStatus/:id', (request, response, next) => {
    orderController.updateStatus(request, response);
});

orderRouter.delete('/delete/:id', (request, response, next) => {
    orderController.deleteOrder(request, response);
});

module.exports = { orderRouter };

