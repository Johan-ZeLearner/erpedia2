'use strict';

const Model = require('objection').Model;

class Stores extends Model {
    static get tableName () {
        return 'store';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'name',
                'id_company'
            ],

            properties: {
                id_store        : {type: 'integer'},
                id_company: {type: 'integer'},
                name   : {
                    type     : 'string',
                    minLength: 1,
                    maxLength: 255
                },
            }
        }
    }
}


module.exports = Stores;