"use strict";

let winston = require('winston');

let Update = (req, res, next) => {
    res.json({
        message: "Company update"
    });
};


module.exports = Update;