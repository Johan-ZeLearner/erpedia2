'use strict';

const Model = require('objection').Model;

class Products extends Model {
    static get tableName() {
        return 'product';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'reference'],

            properties: {
                id_product: {type: 'integer'},
                name: {type: 'string', minLength: 1, maxLength: 255},
                reference: {type: 'string', minLength: 1, maxLength: 255},
            }
        }
    }
}

module.exports = Products;