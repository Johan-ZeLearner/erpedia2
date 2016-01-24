"use strict";

let winston = require('winston');

let Update = (req, res, next) => {
    res.json({
        message: "Product update"
    });
};


module.exports = Update;