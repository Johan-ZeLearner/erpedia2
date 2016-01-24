"use strict";

let express  = require('express')
    , router = express.Router();

router.get(     '/',    require('./actions/read'));
router.patch(   '/',    require('./actions/update'));

// endpoints for sub data
router.use(     '/products', require('../productStores'));

module.exports = router;