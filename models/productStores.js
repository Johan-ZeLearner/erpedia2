'use strict';

const Model = require('objection').Model;

class ProductStores extends Model {
    static get tableName() {
        return 'product_store';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'reference', 'id_store'],

            properties: {
                id_product: {type: 'integer'},
                id_store: {type: 'integer'},
                name: {type: 'string', minLength: 1, maxLength: 255},
                reference: {type: 'string', minLength: 1, maxLength: 255},
            }
        }
    }
}

module.exports = ProductStores;