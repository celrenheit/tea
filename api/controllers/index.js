'use strict';

exports.render = function(req, res) {

    var modules = [];

    res.render('index', {
    	user: req.user ? req.user._id : false
    });
};
