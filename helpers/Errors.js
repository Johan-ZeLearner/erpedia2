"use strict";
const HttpErrors = require('http-errors');

class Errors extends HttpErrors {

    //getErrorType () {
    //    return this.errorType;
    //}

    setErrorType (type) {
        this.errorType = type;
        this.getJson = this.json;
    }

    json () {
        return {
            code : this.code,
            msg  : this.msg,
            stack: this.toString()
        }
    }
}

Errors.prototype.errorType    = 'generic';
Errors.prototype.getErrorType = function () {
    return this.errorType
};

module.exports = Errors;