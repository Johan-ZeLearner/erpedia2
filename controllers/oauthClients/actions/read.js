"use strict";

let Read = (req, res, next) => {
    res.json({
        message: "Product reading id " + req.params.id
    });
};


module.exports = Read;