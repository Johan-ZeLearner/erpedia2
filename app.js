"use strict";
// Get the packages we need
const winston      = require('winston')
    , express      = require('express')
    , session      = require('express-session')
    , cors         = require('cors')
    , Config       = require('./lib/config.js')
    , Constants    = require('./lib/constants.js')
    , bodyParser   = require('body-parser')
    , cookieParser = require('cookie-parser')
    , Knex         = require('knex')
    , passport     = require('passport')
    , ejs          = require('ejs')
    , Model        = require('objection').Model;

// Create our Express application
const app = express();

// Use environment defined port or 3000
const port = process.env.PORT || Config.HTTP_PORT;


// Initialize knex.
const knex    = Knex(Config.MYSQL.development);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);


// Use the passport package in our application
app.use(passport.initialize());

/**
 * WINSTON configuration
 */
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    prettyPrint: true,
    colorize   : true,
    timestamp  : true
});
winston.level = 'debug';


/**
 * CROSS ORIGIN RESOURCE SHARING
 */
app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.set('view engine', 'ejs');

// Use the body-parser package in our application
//app.use(bodyParser.urlencoded({
//    extended: true
//}));

// Use express session support since OAuth2orize requires it
app.use(session({
    secret           : 'Super Secret Session Key',
    saveUninitialized: true,
    resave           : true
}));

app.use(require('./controllers'));

// error handler

app.use((err, req, res, next) => {

    let errorType = err.errorType;

    switch (errorType) {
        case Constants.errors.ERROR_TYPE_API:
            winston.error('[' + err.code + '][API ERROR]', err);
            res.status(err.code).json({
                error: {
                    type   : err.errorType,
                    code   : err.code,
                    message: err.msg
                }
            });
            break;

        case Constants.errors.ERROR_TYPE_INTERNAL:
            winston.error('[' + err.code + '][INTERNAL ERROR]', err.Errors.stack);
            res.status(err.code).json({
                error: {
                    type   : err.errorType,
                    code   : err.code,
                    message: err.msg,
                    stack  : err.Errors.stack
                }
            });
            break;

        default :
            winston.error(err);
            res.status(404).send('middleware not found - error "' + errorType + '" not handled');
    }

});

// Start the server
app.listen(port, () => {
    winston.info('Erpedia API server listening on port ' + port);
});