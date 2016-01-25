'use strict';

const Model = require('objection').Model;

class OAuthCodes extends Model {
    static get tableName () {
        return 'oauth_codes';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'id_oauth_client',
                'id_employee',
                'redirectUri',
                'value',
            ],

            properties: {
                id         : {type: 'integer'},
                id_employee: {type: 'integer'},
                id_oauth_client: {type: 'integer'},
                redirectUri       : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                },
                value     : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                },
            }
        }
    }

    static get relationMappings() {
        return {
            oauth_client: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/oauthClients.js',
                join: {
                    from: 'oauth_codes.id_oauth_client',
                    to: 'oauth_clients.id'
                }
            }
        }
    }
}


module.exports = OAuthCodes;