"use strict";
const healthCheck = require('./server/utils/healthCheck');
const milkRouter = require('./server/v1/milk/milkRoutes').milkRouter;
const orderRouter = require('./server/v1/orders/ordersRoutes').orderRouter

module.exports = function (app) { 
    app.use('/healthCheck', healthCheck);
    app.use('/checkCapacity',milkRouter)
    app.use('/order',orderRouter)
}