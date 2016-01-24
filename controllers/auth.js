const winston        = require('winston')
    , passport       = require('passport')
    , BasicStrategy  = require('passport-http').BasicStrategy
    , BearerStrategy = require('passport-http-bearer').Strategy
    , ApiError       = require('../helpers/apiErrors')
    , InternalError  = require('../helpers/internalErrors')
    , OAuthClients   = require('../models/oauth/oauthClients')
    , OAuthTokens    = require('../models/oauth/oauthTokens')
    , Employees      = require('../models/employees');

passport.use(new BasicStrategy(
    function (email, password, callback) {

        winston.debug('Basic BasicStrategy start');

        Employees
            .query()
            .where('email', 'like', email)
            .then((employees) => {

                if (employees.length != 1) {
                    return callback(new ApiError(404, 'User "' + email + '" Not found'));
                }

                return Employees.authenticate(email, password);
            })

            .then((authenticatedEmployee) => {

                if (authenticatedEmployee.length > 0) {
                    return callback(null, authenticatedEmployee[0]);
                } else {
                    return callback(new ApiError(403, 'Password incorrect'));
                }
            })

            .catch((error) => {

                winston.error(error);
                return callback(new InternalError(503, error));
            });
    }
));


passport.use('client-basic', new BasicStrategy((id, secret, callback) => {

    winston.debug('client basic BasicStrategy start');

    OAuthClients
        .query()
        .where('id', '=', id)
        .andWhere('secret', '=', secret)

        .then((clients) => {

            if (clients.length != 1) {
                return callback(new ApiError(403, 'Credentials are wrong'));
            }

            return callback(null, clients[0]);
        })

        .catch((error) => {
            return callback(error);
        })

}));

passport.use(new BearerStrategy((accessToken, callback) => {

    winston.debug('BearerStrategy start');

    OAuthTokens
        .query()
        .where('value', '=', accessToken)
        .then((tokens)=> {

            if (tokens.length != 1) {
                return callback(new ApiError(403, 'Token is invalid'));
            }


            return Employees
                .query()
                .where('id_employee', '=', tokens[0].id_employee);
        })

        .then((employees) => {

            if (employees.length != 1) {
                return callback(new ApiError(403, 'User not found'));
            }

            return callback(null, employees[0], {scope: '*'});

        })

        .catch((error) => {
            return callback(error);
        })
}));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });