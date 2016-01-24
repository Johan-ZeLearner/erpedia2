'use strict';

const Model = require('objection').Model;

class OAuthClients extends Model {
    static get tableName () {
        return 'oauth_clients';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'id_employee',
                'name',
                'secret',
                'token',
            ],

            properties: {
                id         : {type: 'integer'},
                id_employee: {type: 'integer'},
                name       : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                },
                secret     : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                },
                token     : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                },
            }
        }
    }

    static get relationMappings() {
        return {
            employee: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/../employees',
                join: {
                    from: 'oauth_clients.id',
                    to: 'employee.id_employee'
                }
            },

            codes: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/oauthCodes',
                join: {
                    from: 'oauth_clients.id',
                    to: 'oauth_codes.id_oauth_client'
                }
            }
        }
    }
}


module.exports = OAuthClients;