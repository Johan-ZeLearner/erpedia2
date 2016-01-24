"use strict";

let express  = require('express')
    , router = express.Router()
    , authController = require('../auth');

router.get(     '/',    authController.isAuthenticated, require('./actions/list'));
router.get(     '/:id', authController.isAuthenticated, require('./actions/read'));
router.post(    '/',    authController.isAuthenticated, require('./actions/create'));
router.patch(   '/:id', authController.isAuthenticated, require('./actions/update'));
router.delete(  '/:id', authController.isAuthenticated, require('./actions/delete'));

module.exports = router;