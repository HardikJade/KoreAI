"use strict";

function GenericSuccessMessage() {
    this.code = 200;
    this.status = "success";
}

function GenericFailureMessage() {
    this.code = 400;
    this.status = "failure";
}

function ObjectDoesNotExistInDB() {
    this.code = 200;
    this.status = "not_found";
    this.message = "The queried object does not exist";
}

module.exports = {
    // These are prototypes
    GenericSuccessMessage: GenericSuccessMessage,

    GenericFailureMessage: GenericFailureMessage,

    ObjectDoesNotExistInDB: ObjectDoesNotExistInDB,

    incorrectPayload: {
        code: 400,
        status: "failure",
        message: "Payload is not correct. It's missing one or more of the required information."
    },
};