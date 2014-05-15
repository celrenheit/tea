

process.env['NODE_ENV'] = 'test';
var server            = require('../server');
var app               = server.app;
var http              = require('http');
var superagent        = require('superagent');
var agent             = superagent.agent();
var agent2             = superagent.agent();

var BASE_URL          = "http://localhost:3001";
var user1             = generateCredentials('Foo', 'tictactoe');
var user2             = generateCredentials('Bar', 'tictactoe');
var httpServer;


before(function(done) {
	console.log("Launching express server");
	server.init(function() {
		httpServer = http.createServer(app).listen(3001, function() {
			console.log("Server started on port 3001\n");
			done();
		});
	});

});


describe('Users', function() {

	it('should register a new user', registerUser(agent, user1));

	it('should log the user in', loginUser(agent, user1));
	it('should register a new user', registerUser(agent2, user2));

});

describe('Articles', function() {

	it('should get all published articles', function(done) {
		agent
		.get(BASE_URL + '/articles')
		.end(function(res) {console.log(res.body);
			res.status.should.equal(200);
			done();
		});
	});
	var post;
	it('should publish a new article', function(done) {

		var postData = {
			title: 'Wolf of wall street',
			content: 'Nice film.'
		};
		agent
		.post(BASE_URL + '/articles')
		.send(postData)
		.end(function(res) {
			res.status.should.equal(200);
			post = res.body;
			done();
		});
	});

	it('should find the article by id', function(done) {
		agent
		.get(BASE_URL + '/articles/' + post._id)
		.end(function(res) {
			res.body.should.have.property('title', post.title);
			res.should.have.status(200);
			done();
		});
	});


	it('should update the article', function(done) {

		var postData = {
			title: 'Wolf of wall street',
			content: 'Not that good after all.'
		};

		agent
		.put(BASE_URL + '/articles/' + post._id)
		.send(postData)
		.end(function(res) {
			res.body.should.have.property('content', postData.content);
			res.should.have.status(200);
			done();
		});
	});

	it('should not update the article when it is not the owner', function(done) {

		var postData = {
			title: 'Wolf of wall street',
			content: 'Oh dear, it looks like I did not see this movie before'
		};

		agent2
		.put(BASE_URL + '/articles/' + post._id)
		.send(postData)
		.end(function(res) {
			res.should.have.status(401);
			done();
		});
	});
});

after(function(done) {
	console.log("Closing connection");
	httpServer.close(done);
});




function generateCredentials(usernamePrefix, password) {
	var user = {};

	user.username        = usernamePrefix + '_' + Date.now();
	user.email           = user.username + '@test.com';
	user.password        = password;
	user.confirmPassword = user.password;
	user.name            = user.username;

	return user;
};

function loginUser(agent, credentials) {
  return function(done) {
    agent
      .post(BASE_URL + '/login')
      .send(credentials)
      .end(onResponse);

    function onResponse(err, res) {
      res.status.should.equal(200);
      return done();
    }
  };
}

function registerUser(agent, userData) {
	return function(done) {
		agent
		.post(BASE_URL + '/register')
		.send(userData)
		.end(function(res){
			res.status.should.equal(200);
			done();
		});
	};
}
