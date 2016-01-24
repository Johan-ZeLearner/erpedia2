"use strict";

let Create = (req, res, next) => {
    res.json({
        message: "Product creation"
    });
};


module.exports = Create;