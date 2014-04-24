
/**
 * Module dependencies.
 */
var mogwai = require('mogwai'),
    passport = require('passport');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./api/config/config');

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./api/config/system/bootstrap')(passport, {});

var init = function(callback) {
	mogwai.connect(config.db, function(err, mogwaiDB) {
		if(err) {
			console.log(err);
		}

		return callback();
		

	});
};
var launch = function() {
	return init(function() {
		app.listen(config.port);
		console.log('The server has started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');
	});
};



if(process.env.NODE_ENV !== 'test') {
	launch();
}
exports.init = init;
exports.app = app;