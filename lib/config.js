var Config = {
    HTTP_PORT: 3030,

    //----------------
    // MYSQL
    MYSQL: {
        development: {
            client    : 'mariadb',
            connection: {
                host    : '37.187.27.16',
                user    : 'erpedia',
                password: 'PlFHt6445N',
                db      : 'erpedia'
            }
        }
    },


    //----------------
    // AUTHENTICATION

    AUTH_TOKEN_NAME: 'x-auth-token'

};

module.exports = Config;