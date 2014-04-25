'use strict';

exports.render = function(req, res) {

    var modules = [];

    res.render('index', {
    	user: req.isAuthenticated() ? JSON.stringify(req.user) : '0'
    });
};
