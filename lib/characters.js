//
//     Marvel-API
//     Copyright(c) 2014 Matt Hernandez <matt@modulus.io>
//     ISC Licensed
//

var request = require('request')
  , util    = require('util')
  , utils   = require('./utils')
  , Q       = require('q');

module.exports = function(options) {
  var pubkey    = options.publicKey
    , privkey   = options.privateKey
    , internals = {};

  //
  // Get a list of characters.
  //    Accepts a limit that defaults to 20;
  //    Accepts an offset that defaults to 0;
  //
  internals.findAll = function(limit, offset, fn) {
    var deferred = Q.defer()
      , ts = utils.timestamp();

    if (typeof limit === 'function') {
      fn = limit;
      limit = 20;
    }

    if (typeof offset === 'function') {
      fn = offset;
      offset = 0;
    }

    request({
      url: 'http://gateway.marvel.com/v1/public/characters'
    , json: true
    , qs: {
        ts: ts
      , apikey: pubkey
      , hash: utils.createHash(ts, privkey, pubkey)
      , limit: limit || 20
      , offset: offset || 0
      }
    }, function(err, response) {
      if (err) {
        return deferred.reject(err);
      }

      if (response.statusCode !== 200) {
        return deferred.reject(new Error(response.body));
      }

      deferred.resolve(response.body.data.results);

    });

    return deferred.promise.nodeify(fn);
  };

  //
  // Get a single character with the specified name.
  //    Accepts a String name;
  //
  internals.findByName = function(name, fn) {
    var deferred = Q.defer()
      , ts = utils.timestamp();

    request({
      url: 'http://gateway.marvel.com/v1/public/characters'
    , json: true
    , qs: {
        ts: ts
      , apikey: pubkey
      , hash: utils.createHash(ts, privkey, pubkey)
      , name: name
      }
    }, function(err, response) {
      if (err) {
        return deferred.reject(err);
      }

      if (response.statusCode !== 200) {
        return deferred.reject(new Error(response.body));
      }

      deferred.resolve(response.body.data.results);

    });

    return deferred.promise.nodeify(fn);
  };

  //
  // Get a single character with the specified ID.
  //    Accepts a String ID;
  //
  internals.find = function(id, fn) {
    var deferred = Q.defer()
      , ts = utils.timestamp();

    request({
      url: 'http://gateway.marvel.com/v1/public/characters/' + id
    , json: true
    , qs: {
        ts: ts
      , apikey: pubkey
      , hash: utils.createHash(ts, privkey, pubkey)
      }
    }, function(err, response) {
      if (err) {
        return deferred.reject(err);
      }

      if (response.statusCode !== 200) {
        return deferred.reject(new Error(response.body));
      }

      deferred.resolve(response.body.data.results);

    });

    return deferred.promise.nodeify(fn);
  };

  //
  // Get a list of comics filtered by character ID.
  //    Accepts a String ID;
  //
  internals.comics = function(id, limit, offset, fn) {
    if (typeof limit === 'function') {
      fn = limit;
      limit = 20;
    }

    if (typeof offset === 'function') {
      fn = offset;
      offset = 0;
    }

    var deferred = Q.defer()
      , ts = utils.timestamp();

    request({
      url: util.format('http://gateway.marvel.com/v1/public/characters/%s/comics', id)
    , json: true
    , qs: {
        ts: ts
      , apikey: pubkey
      , hash: utils.createHash(ts, privkey, pubkey)
      , limit: limit || 20
      , offset: offset || 0
      }
    }, function(err, response) {
      if (err) {
        return deferred.reject(err);
      }

      if (response.statusCode !== 200) {
        return deferred.reject(new Error(response.body));
      }

      deferred.resolve(response.body.data.results);

    });

    return deferred.promise.nodeify(fn);
  };

  //
  // Get a list of events filtered by character ID.
  //    Accepts a String ID;
  //
  internals.events = function(id, limit, offset, fn) {
    if (typeof limit === 'function') {
      fn = limit;
      limit = 20;
    }

    if (typeof offset === 'function') {
      fn = offset;
      offset = 0;
    }

    var deferred = Q.defer()
      , ts = utils.timestamp();

    request({
      url: util.format('http://gateway.marvel.com/v1/public/characters/%s/events', id)
    , json: true
    , qs: {
        ts: ts
      , apikey: pubkey
      , hash: utils.createHash(ts, privkey, pubkey)
      , limit: limit || 20
      , offset: offset || 0
      }
    }, function(err, response) {
      if (err) {
        return deferred.reject(err);
      }

      if (response.statusCode !== 200) {
        return deferred.reject(new Error(response.body));
      }

      deferred.resolve(response.body.data.results);

    });

    return deferred.promise.nodeify(fn);
  };

  //
  // Get a list of stories filtered by character ID.
  //    Accepts a String ID;
  //
  internals.stories = function(id, limit, offset, fn) {
    if (typeof limit === 'function') {
      fn = limit;
      limit = 20;
    }

    if (typeof offset === 'function') {
      fn = offset;
      offset = 0;
    }

    var deferred = Q.defer()
      , ts = utils.timestamp();

    request({
      url: util.format('http://gateway.marvel.com/v1/public/characters/%s/stories', id)
    , json: true
    , qs: {
        ts: ts
      , apikey: pubkey
      , hash: utils.createHash(ts, privkey, pubkey)
      , limit: limit || 20
      , offset: offset || 0
      }
    }, function(err, response) {
      if (err) {
        return deferred.reject(err);
      }

      if (response.statusCode !== 200) {
        return deferred.reject(new Error(response.body));
      }

      deferred.resolve(response.body.data.results);

    });

    return deferred.promise.nodeify(fn);
  };

  return internals;
};
