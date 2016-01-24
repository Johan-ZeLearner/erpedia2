"use strict";

const winston       = require('winston')
    , validate      = require('validate')
    , uuid          = require('uuid')
    , OAuthClients  = require('../../../models/oauth/oauthClients')
    , ApiError      = require('../../../helpers/apiErrors')
    , InternalError = require('../../../helpers/internalErrors');

let Create = (req, res, next) => {

    validateInput(req.body, next)

        .then((body) => {
            return checkDuplicateName(body, req.user);
        })

        .then((body) => {
            return OAuthClients
                .query()
                .insert({
                    id_employee: parseInt(req.user.id_employee),
                    name       : body.name,
                    token      : uuid.v1(),
                    secret     : uuid.v4(),
                })

        })
        .then((client) => {
            res.json(client);
        })

        .catch((error) => {
            next(error);
        })
};


let validateInput = (body) => {
    let client = validate({
        name: {
            type    : 'string',
            required: true,
            message : 'name is required'
        }
    });

    let errors = client.validate(body);

    if (errors.length > 0) {
        return Promise.reject(errors);
    } else {
        return Promise.resolve(body);
    }
};


let checkDuplicateName = (body, user) => {

    return new Promise((resolve, reject) => {

        OAuthClients
            .query()
            .count('* as count')
            .andWhere('id_employee', '=', user.id_employee)
            .andWhere('name', 'like', body.name)
            .then((count) => {
                if (count[0] && count[0].count && count[0].count == 0) {
                    resolve(body);
                } else {
                    winston.error('count is bad', count);
                    reject(new ApiError('401', 'Name "' + body.name + '" already used'));
                }
            })

            .catch((error) => {
                reject(error);
            })
    });
};


module.exports = Create;