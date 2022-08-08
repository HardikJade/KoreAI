"use strict";
const responseMessage = require('../../utils/responseMessage');
const OrderModel = require('./ordersModel');
const MilkModel = require('../milk/milkModel');
const { default: mongoose } = require('mongoose');
const orderConfig = require('./orderConfig.json');

module.exports = {
    addOrder: async (request, callback) => {
        const name = request.body.name;
        const capacity = (request.body.capacity) ? parseInt(request.body.capacity) : null;
        const date = request.body.date;
        const address = request.body.address;
        const availableCapacity = request.availableCapacity;
        const milkId = request.milkId;
        if (name && capacity && date && address) {
            if (availableCapacity >= capacity) {
                try {
                    const order = await OrderModel.create({
                        name: name,
                        capacity: capacity,
                        date: date,
                        address: address
                    })
                    const currentAvail = availableCapacity - capacity;
                    await MilkModel.findByIdAndUpdate(milkId, {
                        $set: {
                            capacity: currentAvail
                        }
                    });
                    let response = new responseMessage.GenericSuccessMessage();
                    response.data = order;
                    return callback(null, response, response.code);
                } catch (err) {
                    console.log('ERROR::: occurred in addOrder function', err);
                    let response = new responseMessage.GenericFailureMessage();
                    response.err = err;
                    return callback(null, response, response.code);
                }
            } else {
                let response = new responseMessage.GenericFailureMessage();
                response.reason = 'Milk is not available!';
                return callback(null, response, response.code);
            }
        }
        else {
            let response = responseMessage.incorrectPayload;
            return callback(null, response, response.code);
        }
    },
    updateOrder: async (request, callback) => {
        const id = request.params.id;
        if (id && mongoose.isValidObjectId(id)) {
            try {
                const previousOrder = await OrderModel.findById(id);
                if (previousOrder) {

                    const name = request.body.name;
                    const capacity = (request.body.capacity) ? parseInt(request.body.capacity) : null;
                    const address = request.body.address;

                    let updateObject = {};
                    if (name) {
                        updateObject.name = name;
                    }
                    if (address) {
                        updateObject.address = address;
                    }
                    if (capacity) {
                        const availableCapacity = request.availableCapacity;
                        const milkId = request.milkId;
                        const newCapacity = availableCapacity + previousOrder.capacity - capacity;
                        if (newCapacity >= 0) {
                            updateObject.capacity = capacity;
                            await MilkModel.findByIdAndUpdate(milkId, {
                                $set: {
                                    capacity: newCapacity
                                }
                            })

                        } else {
                            let response = new responseMessage.GenericFailureMessage();
                            response.reason = "Milk is not available";
                            return callback(null, response, response.code);
                        }
                    }

                    const renewedOrder = await OrderModel.findByIdAndUpdate(id, { $set: updateObject });
                    let response = new responseMessage.GenericSuccessMessage();
                    response.data = renewedOrder;
                    return callback(null, response, response.code);

                } else {
                    let response = new responseMessage.ObjectDoesNotExistInDB();
                    return callback(null, response, response.code);
                }

            } catch (err) {
                console.log('ERROR::: occurred in updateOrder function', err);
                let response = new responseMessage.GenericFailureMessage();
                response.err = err;
                return callback(null, response, response.code);
            }


        }
        else {
            let response = responseMessage.incorrectPayload;
            return callback(null, response, response.code);
        }
    },
    updateStatus: async (request, callback) => {
        const id = request.params.id;
        const status = request.body.status;
        if (id && mongoose.isValidObjectId(id) && status && orderConfig.orderStatus.values.includes(status)) {
            try {
                await OrderModel.findByIdAndUpdate(id, {
                    $set: {
                        status: status
                    }
                })
                let response = new responseMessage.GenericSuccessMessage();
                response.reason = 'Status updated!';
                return callback(null, response, response.code);
            }
            catch (err) {
                console.log('ERROR::: occurred in updateStatus function', err);
                let response = new responseMessage.GenericFailureMessage();
                response.reason = err;
                return callback(null, response, response.code);
            }
        }
        else {
            let response = responseMessage.incorrectPayload;
            return callback(null, response, response.code);
        }
    },
    deleteOrder: async (request, callback) => {
        const id = request.params.id;
        if (id && mongoose.isValidObjectId(id)) {
            try {
                const order = await OrderModel.findByIdAndDelete(id);
                if (order && order.date) {
                    await MilkModel.findOneAndUpdate(
                        { date: order.date },
                        { $inc: { capacity: order.capacity } }
                    );
                    let response = new responseMessage.GenericSuccessMessage();
                    response.reason = 'Order deleted!';
                    return callback(null, response, response.code);

                } else {
                    let response = new responseMessage.ObjectDoesNotExistInDB();
                    return callback(null, response, response.code);
                }
            } catch (err) {
                console.log('ERROR::: occurred in deleteOrder function', err);
                let response = new responseMessage.GenericFailureMessage();
                response.err = err;
                return callback(null, response, response.code);
            }
        }
        else {
            let response = responseMessage.incorrectPayload;
            return callback(null, response, response.code);
        }
    }
}