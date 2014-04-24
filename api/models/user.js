'use strict';

/**
 * Module dependencies.
 */
var mogwai = require('mogwai'),
    Schema = mogwai.Schema,
    crypto = require('crypto');

/**
 * User Schema
 */
var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    username: {
        type: String,
        unique: true
    },
    hashed_password: String,
    provider: String,
    salt: String,
    facebook: String,
    twitter: String,
    github: String,
    google: String,
    linkedin: String
});


/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};


/**
 * Methods
 */
UserSchema.method({

    /**
     * HasRole - check if the user has required role
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    hasRole: function(role) {
        var roles = this.roles;
        return (roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1);
    },
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.hashPassword(plainText) === this.password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Hash password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    hashPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },

    hasCreated: function(articleId, callback) {
        var grex = this.connection.client;
        var gremlin = grex.gremlin();

        var query = gremlin.g.v(this._id).out('created');
        
        query.gremlin.exec(callback);
    }
});

mogwai.model('User', UserSchema);
