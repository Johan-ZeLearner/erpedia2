"use strict";
let winston          = require('winston')
    , express        = require('express')
    , checkName      = require('./stores/middlewares/checkName')
    , authController = require('./auth')
    , router         = express.Router();

router.get('/', (req, res) => {

    res.json({
        message: "Welcome to the Erpedia API "
    });

});

router.use('/products', require('./products'));
router.use('/stores', require('./stores'));
router.use('/companies', require('./companies'));
router.use('/oauth_clients', authController.isAuthenticated, require('./oauthClients'));
router.use('/oauth2', require('./oauth2'));


// Routes prefixed by store name
router.use('/:name', checkName, require('./stores/subindex'));

module.exports = router;