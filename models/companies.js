'use strict';

const Model = require('objection').Model;

class Companies extends Model {
    static get tableName () {
        return 'company';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'name',
            ],

            properties: {
                id_company        : {type: 'integer'},
                name   : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                }
            }
        }
    }
}


module.exports = Companies;