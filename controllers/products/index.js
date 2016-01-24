"use strict";

let express  = require('express')
    , router = express.Router();

router.get(     '/',    require('./actions/list'));
router.get(     '/:id', require('./actions/read'));
router.post(    '/',    require('./actions/create'));
router.patch(   '/:id',    require('./actions/update'));
router.delete(  '/:id',    require('./actions/delete'));

module.exports = router;