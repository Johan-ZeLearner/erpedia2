"use strict";

const Error     = require('./errors');
const Constants = require('../lib/constants');

let ApiErrors = function ApiErrors(code, message) {
    this.errorType = Constants.errors.ERROR_TYPE_API;
    this.code      = code;
    this.msg       = message;
    this.Errors    = new Error(code, message);
};

module.exports = ApiErrors;