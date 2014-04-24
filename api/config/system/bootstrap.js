'use strict';

var express = require('express'),
    appPath = process.cwd();


module.exports = function(passport, db) {

    function bootstrapModels() {
        // Bootstrap models
        require('../util').walk(appPath + '/api/models', null, function(path) {
            require(path);
        });
    }

    bootstrapModels();

    // Bootstrap passport config
    require(appPath + '/api/config/passport')(passport);



    // Express settings
    var app = express();
    require(appPath + '/api/config/express')(app, passport, db);

    return app;
};
