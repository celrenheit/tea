'use strict';

/**
 * Module dependencies.
 */
var mogwai = require('mogwai'),
    Article = mogwai.model('Article'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Article.findById(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = new Article(article[0]);
        next();
    });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
    var article = new Article();

    for(var attribute in req.body) {
        article[attribute] = req.body[attribute];
    }



    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        }

        article.createdBy(req.user._id, function(err, results) {

            if(err) {
                return res.jsonp({
                    errors: err.errors
                }, 500);
            }
            res.jsonp(article);

        });
    });
};

/**
 * Update an article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;
    
    Article.delete(req.article._id, function(err, results) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp({
                success: true,
                message: 'Article successfully deleted'
            });
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.article);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Article.all(function(err, results) {
        res.jsonp(results.results);

    });
};