"use strict";

const winston       = require('winston')
    , ListHelper    = require('../../../helpers/listHelpers').playAll
    , QueryHelper   = require('../../../helpers/queryHelpers').applyListHelpers
    , ProductStores = require('../../../models/productStores')
    , InternalError = require('../../../helpers/internalErrors');

let List = (req, res, next) => {

    //winston.info('productStore list (product store ' + req.context.store.id_store + ' / ' + req.context.store.name);

    let query = ProductStores
        .query()
        .where('id_store', '=', req.context.store.id_store);

    query = QueryHelper(query, ListHelper(req.query));

    winston.info('query : ' + query.toSql());

    query.then((products) => {
        res.json(products);
    })
        .catch((error) => {
            next(new InternalError(503, error));
        })
};


module.exports = List;