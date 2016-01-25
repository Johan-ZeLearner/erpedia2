"use strict";
const winston = require('winston');

let playAll = (query) => {
    return {
        pagination: pagination(query),
        conditions: conditions(query),
        fields    : fields(query),
    }
};


let pagination = (query) => {

    let offset = 0;
    let count  = 100;

    if (query.offset && query.offset.length > 0 && query.offset >= 0) {
        offset = parseInt(query.offset);
    }

    if (query.count && query.count.length > 0 && query.count > 0) {
        count = parseInt(query.count);
    }

    return {
        offset,
        count,
    }
};


let conditions = (query) => {

    let conditions = [];
    if (query && query.conditions && query.conditions.length > 0) {
        let conditionsGrouped = query.conditions.split(',');

        conditions = conditionsGrouped.map((conditionGrouped) => {

            let conditionArray = conditionGrouped.split('=');
            return {
                condition: conditionArray[0],
                value    : conditionArray[1]
            };
        })
    }

    return conditions;
};


let fields = (query) => {
    let fields = [];

    if (query && query.fields && query.fields.length > 0) {
        fields = query.fields.split(',');
    }

    return fields;
};


module.exports = {
    pagination,
    conditions,
    fields,
    playAll
};