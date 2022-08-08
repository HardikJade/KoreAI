"use strict";
const mongoose = require('mongoose');
const responseMessage = require('../../utils/responseMessage');
const MilkModel = require('./milkModel');
const milkConfig = require('./milkConfig.json');

module.exports = {
    checkCapacity: async (request, callback) => {
        const date = request.params.date;
        // validate item is real date or not here
        if (date) {
            try {
                const capacity = await MilkModel.findOneAndUpdate({ "date": date }, { "date": date }, { upsert: true });
                let result = capacity;
                if (capacity === null) {
                    result = milkConfig.defaultCapacity;
                } else {
                    result = capacity.capacity;
                }
                let response = new responseMessage.GenericSuccessMessage();
                response.data = result;
                return callback(null, response, response.code);
            } catch (err) {
                console.log('ERROR::: occurred in checkCapacity function', err);
                let response = new responseMessage.GenericFailureMessage();
                response.err = err;
                return callback(null, response, response.code);
            }
        } else {
            let response = responseMessage.incorrectPayload;
            return callback(null, response, response.code);
        }
    }
}