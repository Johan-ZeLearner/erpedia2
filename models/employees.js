'use strict';

const md5           = require('md5')
    , winston       = require('winston')
    , Model         = require('objection').Model
    , ApiError      = require('../helpers/apiErrors')
    , InternalError = require('../helpers/internalErrors');

class Employees extends Model {
    static get tableName () {
        return 'employee';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'email',
                'password',
                'login',
            ],

            properties: {
                id_employee: {type: 'integer'},
                last_name  : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                },
                first_name : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                },
                email      : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                },
                password   : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                },
            }
        }
    }

    static get relationMappings () {
        return {
            oauth_clients: {
                relation  : Model.OneToManyRelation,
                modelClass: __dirname + '/oauth/oauthClients',
                join      : {
                    from: 'employee.id_employee',
                    to  : 'OAuthClient.id'
                }
            }
        }
    }


    static authenticate (email, password) {
        var passwordMd5 = md5(password);

        winston.info('email : ' + email + ' password : ' + password);

        let query = Employees
            .query()
            .where(function () {
                this.where('email', 'like', email)
                    .andWhere('password', 'like', password);
            })
            .orWhere(function () {
                this.where('email', 'like', email)
                    .andWhere('password', 'like', passwordMd5);
            });

        winston.debug('Query : ' + query.toSql());

        return query;
    }
}


module.exports = Employees;