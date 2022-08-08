"use strict";
const responseMessage = require('./responseMessage');
const MilkModel = require('../v1/milk/milkModel');
const milkConfig = require('../v1/milk/milkConfig.json')
async function isMilkAvailable(request, response, next) {
    const date = request.body.date;
    if (date) {
        try {
            const capacity = await MilkModel.findOneAndUpdate({ "date": date }, { "date": date }, { upsert: true, new: true });
            let result = capacity;
            if (capacity === null) {
                result = milkConfig.defaultCapacity;
            } else {
                result = capacity.capacity;
                request.milkId = capacity._id;
            }
            request.availableCapacity = result;
            next();
        } catch (err) {
            console.log('ERROR::: occurred in checkCapacity function', err);
            let response = new responseMessage.GenericFailureMessage();
            response.err = err;
            return callback(null, response, response.code);
        }


    }
    else {
        let result = responseMessage.incorrectPayload;
        return response.status(result.code).send(result);
    }
}
module.exports = {
    isMilkAvailable: isMilkAvailable,
    canUpdate: (request, response, next) => {
        if (request.body.capacity) {
            isMilkAvailable(request, response, next);
        } else { next(); }
    }
}