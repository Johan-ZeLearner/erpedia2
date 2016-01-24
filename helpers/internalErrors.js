"use strict";

const Errors    = require('./errors');
const Constants = require('../lib/constants');

let InternalErrors = function InternalErrors (code, message) {
    this.errorType = Constants.errors.ERROR_TYPE_INTERNAL;
    this.code      = code;
    this.msg       = message;
    this.Errors    = new Error(code, message);
};

module.exports = InternalErrors;