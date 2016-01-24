"use strict";

let winston = require('winston');

let Update = (req, res, next) => {
    res.json({
        message: "Store update"
    });
};


module.exports = Update;