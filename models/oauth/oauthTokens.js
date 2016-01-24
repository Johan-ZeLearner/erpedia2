'use strict';

const Model = require('objection').Model;

class OAuthTokens extends Model {
    static get tableName () {
        return 'oauth_tokens';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'id_oauth_client',
                'id_employee',
                'value',
            ],

            properties: {
                id         : {type: 'integer'},
                id_employee: {type: 'integer'},
                id_oauth_client: {type: 'integer'},
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


module.exports = OAuthTokens;