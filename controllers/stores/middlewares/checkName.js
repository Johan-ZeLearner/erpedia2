"use strict";
const Stores        = require('../../../models/stores')
    , winston       = require('winston')
    , ApiError      = require('../../../helpers/apiErrors')
    , InternalError = require('../../../helpers/internalErrors');


let CheckName = (req, res, next) => {

    let name = req.params.name;

    if (name.length == 0){
        next(new ApiError(400, 'the "name" parameter is missing'));
    }

    Stores
        .query()
        .where('name', 'like', name)
        .then((stores) => {

            if (stores.length == 1) {

                req.context = {
                    store: stores[0]
                };

                next();
            } else {
                let apiError = new ApiError(404, 'Store "'+ name +'" not found');
                //winston.info('apiError', apiError);
                next(apiError);
            }
        })

        .catch((error) => {
            //winston.debug('[CheckName] error ', error.data);
            //winston.debug('[CheckName] error ', error.stack);
            //res.json({error});
            next(new InternalError(503, error));
        }
    );

};


module.exports = CheckName;
