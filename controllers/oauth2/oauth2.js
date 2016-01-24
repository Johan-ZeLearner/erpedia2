'use strict';
const oauth2orize  = require('oauth2orize')
    , Employees    = require('../../models/employees')
    , OAuthClients = require('../../models/oauth/oauthClients')
    , OAuthTokens  = require('../../models/oauth/oauthTokens')
    , OAuthCodes   = require('../../models/oauth/oauthCodes')
    , ApiError     = require('../../helpers/apiErrors');


// Create OAuth 2.0 server
var server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function (client, callback) {
    return callback(null, client.id);
});

// Register deserialization function
server.deserializeClient(function (id, callback) {

    Employees
        .query()
        .where('id', '=', id)

        .then((clients) => {

            if (clients.length != 1) {
                return callback(new ApiErrors(403, 'session id not identified'));
            }

            return callback(null, clients[0]);
        })

        .catch((error) => {
            callback(error);
        });
});


// Register authorization code grant type
server.grant(oauth2orize.grant.code(function (oauthClient, redirectUri, employee, ares, callback) {
    // Create a new authorization code
    var code = {
        value          : uid(16),
        id_oauth_client: oauthClient.id,
        redirectUri    : redirectUri,
        id_employee    : employee.id_employee
    };

    OAuthCodes
        .query()
        .insert(code)
        .then((codeInserted) => {
            callback(null, code.value);
        })

        .catch((error) => {
            callback(error);
        });


}));


// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(function (oauthClient, code, redirectUri, callback) {

    OAuthCodes
        .query()
        .where('value', '=', code)
        .then((oauthCode) => {

            if (!oauthCode) {
                return callback(null, false);
            }
            if (oauthCode.id_oauth_client != oauthClient.id) {
                return callback(null, false);
            }
            if (oauthCode.redirectUri != redirectUri) {
                return callback(null, false);
            }

            return oauthCode.remove();
        })

        .then(() => {
            // Create a new access token
            var token = {
                value          : uid(256),
                id_oauth_client: oauthClient.id,
                id_employee    : oauthClient.id_employee
            };

            return OAuthTokens
                .query()
                .insert(token)
        })

        .then((oauthToken) => {
            return callback(null, token);
        })

        .catch((error) => {
            return callback(error);
        });
}));


// User authorization endpoint
exports.authorization = [
    server.authorization(function (token, redirectUri, callback) {

        OAuthClients
            .query()
            .where('token', '=', token)
            .then((oauthClients) => {

                if (oauthClients.length != 1) {
                    return callback(new ApiError(403, 'id_oauth_client not found'));
                }

                return callback(null, oauthClients[0], redirectUri);
            })
            .catch((error) => {
                callback(error);
            });
    }),
    function (req, res) {
        res.render('dialog', {
            transactionID: req.oauth2.transactionID,
            user         : req.user,
            client       : req.oauth2.client
        });
    }
];

// User decision endpoint
exports.decision = [
    server.decision()
];

// Application client token exchange endpoint
exports.token = [
    server.token(),
    server.errorHandler()
];

function uid (len) {
    var buf       = []
        , chars   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}