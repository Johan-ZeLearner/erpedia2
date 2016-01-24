"use strict";

let applyListHelpers = (query, listHelpers) => {

    if (listHelpers.fields && listHelpers.fields.length > 0) {
        query.select(listHelpers.fields);
    }

    if (listHelpers.conditions && listHelpers.conditions.length > 0) {

        listHelpers.conditions.map((condition) => {
            query.andWhere(condition.condition, '=', condition.value);
        });
    }

    if (listHelpers.pagination && listHelpers.pagination.count) {
        query.limit(listHelpers.pagination.count);
        query.offset(listHelpers.pagination.offset);
    }

    return query;
};


module.exports = {
    applyListHelpers
};


