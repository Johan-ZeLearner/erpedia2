"use strict";

let express            = require('express')
    , router           = express.Router()
    , oauth2Controller = require('./oauth2')
    , authController   = require('../auth');

router.get( '/authorize', oauth2Controller.authorization);
router.post('/authorize', authController.isAuthenticated, oauth2Controller.decision);
router.post('/token',     authController.isAuthenticated, oauth2Controller.token);

module.exports = router;