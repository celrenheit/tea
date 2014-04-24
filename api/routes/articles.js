'use strict';

// Articles routes use articles controller
var articles = require('../controllers/articles');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    req.article.isCreated(req.article._id, function(err, result) {
        var user = result.results[0];
        if(err || !user || user._id !== req.user._id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    });
	/*if (req.article.user._id !== req.user._id) {
        return res.send(401, 'User is not authorized');
    }
    next();*/
};

module.exports = function(app) {

    app.get('/articles', articles.all);
    app.post('/articles', authorization.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.update);
    app.del('/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.destroy);

    // Finish with setting up the articleId param
    app.param('articleId', articles.article);

};