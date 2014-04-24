'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
	db: {
      host: "localhost",
      port: 8182,
      graph: "tinkergraph",
      client: "titan"
    },
	templateEngine: 'swig',

	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'GREENTEA',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions',
	sessionStore: {
	    db: 'sessions',
	    host: '127.0.0.1',
	    port: 6379
	}
};
