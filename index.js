const path = require('path');
const express = require('express');

const ParseServer = require('parse-server').ParseServer;
const RedisCacheAdapter = require('parse-server').RedisCacheAdapter;

const args = process.argv || [];


const DATABASE_URI = (process.env.DATABASE_URI) || (process.env.MONGODB_URI) || ('mongodb://localhost:27017/dev');
const CACHE_REDIS_URI = (process.env.CACHE_REDIS_URI) || ('redis://localhost:6379');

const APP_ID = (process.env.APP_ID) || ('myAppId');
const MASTER_KEY = (process.env.MASTER_KEY) || (''); //Add your master key here. Keep it secret!

const SERVER_URL = (process.env.SERVER_URL) || ('http://localhost:1337/parse'); // Don't forget to change to https if needed;
const CLOUD_CODE_MAIN = (process.env.CLOUD_CODE_MAIN) || ('./cloud/main.js');

const LIVE_QUERY_CLASSES = (process.env.LIVE_QUERY_CLASSES || 'Posts,Comments').split(',');
const LIVE_QUERY_REDIS_URI = (process.env.LIVE_QUERY_REDIS_URI) || ('redis://localhost:6379');

const PORT = (process.env.PORT) || (1337);
const MOUNT = (process.env.MOUNT) || ('/parse');

// redis cache
var redisOptions = { url: CACHE_REDIS_URI };
var redisCache = new RedisCacheAdapter(redisOptions);

// parse config
const config = {
  databaseURI: DATABASE_URI,
  cloud: CLOUD_CODE_MAIN,
  appId: APP_ID,
  masterKey: MASTER_KEY,
  serverURL: SERVER_URL,
  cacheAdapter: redisCache,
  liveQuery: {
    classNames: LIVE_QUERY_CLASSES, // List of classes to support for query subscriptions
  },
};

// express app
const app = express();

// serve the Parse API on the /parse (or config provided) URL prefix
const api = new ParseServer(config);
app.use(MOUNT, api);

// start http server
const httpServer = require('http').createServer(app);
httpServer.listen(PORT, function () {
  console.log('parse-server running on port ' + PORT + '.');
});

// enable the Live Query real-time server
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer, {
  redisUrl: LIVE_QUERY_REDIS_URI,
});

module.exports = {
  app,
  config,
};
