# Tea - Titan Express Angular

## Where does it come from?
Tea is originaly a fork of [Mean.io](http://mean.io/) tweaked to make it work with a Graph Database (Titan) behind instead MongoDB.

It uses [Gulthor's Mogwai](https://github.com/gulthor/mogwai) as it's Object Graph Mapper (OGM)

## Developement Quick Start

To install all dependencies run: 
```javascript
npm install
```

You need to run the current version of rexster web server, which can be found [here](https://github.com/tinkerpop/rexster/wiki/Downloads).


If you need to change later, the configuration of the rexster server. You can change it depending on your environment in the files located in the folder: /api/config/env

There is also need for a redis-server to store session related stuffs.


## Launch Web Server


```javascript
node server.js
```

## Tests

To run test using gulp (which has to be installed on your system globally "npm install -g gulp"):
```javascript
gulp test
```
or, to watch for changes:
```javascript
gulp watch
```
