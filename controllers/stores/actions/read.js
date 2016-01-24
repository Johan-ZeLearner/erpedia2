"use strict";
const winston       = require('winston');
const Stores        = require('../../../models/stores');
const ApiError      = require('../../../helpers/apiErrors');
const InternalError = require('../../../helpers/internalErrors');

let Read = (req, res, next) => {

    let id = req.params.id || req.context.store.id_store;

    winston.info('id params : ' + req.params.id);
    winston.info('id context : ', req.context);

    if (id > 0) {
        Stores
            .query()
            .where('id_store', 'd=', id)
            .then((stores) => {

                if (stores.length == 1) {
                    res.json(stores[0]);
                } else {
                    next(new ApiError(404, 'Store corresponding to ' + id + ' not found'));
                }

            })
            .catch((error) => {
                let internalError = new InternalError(503, error);

                next(internalError);
            })
    } else {
        next(new ApiError(400, 'the id parameter is missing'));
    }
};

module.exports = Read;