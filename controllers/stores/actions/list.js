"use strict";

const winston       = require('winston')
    , Stores        = require('../../../models/stores')
    , ApiError      = require('../../../helpers/apiErrors')
    , ListHelper    = require('../../../helpers/listHelpers').playAll
    , QueryHelper   = require('../../../helpers/queryHelpers').applyListHelpers
    , InternalError = require('../../../helpers/internalErrors');

let List = (req, res, next) => {

    let query = Stores
        .query();

    query = QueryHelper(query, ListHelper(req.query));

    query
        .then((stores) => {
            res.json(stores);
        })
        .catch((error) => {
            next(new InternalError(503, error));
        })
};


module.exports = List;