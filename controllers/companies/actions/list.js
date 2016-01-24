"use strict";

const Companies     = require('../../../models/companies');
const ListingHelper = require('../../../helpers/listHelpers').playAll;
const QueryHelper   = require('../../../helpers/queryHelpers').applyListHelpers;

let List = (req, res, next) => {


    let query = Companies
        .query();

    QueryHelper(query, ListHelper(query));


};


module.exports = List;