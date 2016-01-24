"use strict";

let Read = (req, res, next) => {
    res.json({
        message: "Company reading id " + req.params.id
    });
};


module.exports = Read;