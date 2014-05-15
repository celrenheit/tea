'use strict';

/**
 * Module dependencies.
 */
var mogwai = require('mogwai'),
    Schema = mogwai.Schema;


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: String,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    }
});




ArticleSchema.statics.all = function(cb) {
    var grex = mogwai.connection.client;

    var query = grex.gremlin().g.V('$type', 'article').transform("{m=it.map(); m._id=it.id; m.user=it.in('created').map.first(); m}");

    query.gremlin.exec(cb);
};

ArticleSchema.statics.isCreator = function(userId, callback) {
    var grex = mogwai.connection.client;
    var gremlin = grex.gremlin();

};

ArticleSchema.method({

    publishedFrom: function(userId, callback) {
            var grex = mogwai.connection.client;

            var gremlin = grex.gremlin();
            gremlin.g.identify("article").v(this._id);
            gremlin.g.identify("user").v(userId);

            gremlin.g.addEdge(gremlin.user, gremlin.article, 'published', { time: Date.now() });

            gremlin.exec(callback);
    },

    createdBy: function(userId, callback) {
            var grex = mogwai.connection.client;

            var gremlin = grex.gremlin();
            gremlin.g.identify("article").v(this._id);
            gremlin.g.identify("user").v(userId);

            gremlin.g.addEdge(gremlin.user, gremlin.article, 'created', { time: Date.now() });

            gremlin.exec(callback);
    },

    isCreated: function(userId, callback) {
        var grex = this.connection.client;
        var gremlin = grex.gremlin();

        var query = gremlin.g.v(this._id).in('created');

        query.gremlin.exec(callback);
    },

    getCreator: function(callback) {
        var grex = this.connection.client;
        var gremlin = grex.gremlin();

        var query = gremlin.g.v(this._id).in('created');

        query.gremlin.exec(callback);
    }

});
mogwai.model('Article', ArticleSchema);
