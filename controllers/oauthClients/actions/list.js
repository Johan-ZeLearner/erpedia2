"use strict";

const winston       = require('winston')
    , OAuthClients  = require('../../../models/oauth/oauthClients')
    , ApiError      = require('../../../helpers/apiErrors')
    , ListHelper    = require('../../../helpers/listHelpers').playAll
    , QueryHelper   = require('../../../helpers/queryHelpers').applyListHelpers
    , InternalError = require('../../../helpers/internalErrors');

let List = (req, res, next) => {

    let query = OAuthClients
        .query()
        .where('id_employee', '=', req.user.id_employee);

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