var assert    = require('assert');
var path      = require('path');
var fs        = require('fs');

var uuid      = require('uuid');
var levelup   = require('levelup');
var store     = require('../');

var log = function() {
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(this, ["DEBUG: "].concat(args));
}


var read = function(fname) {
  var fname = path.join(__dirname, fname)
  return fs.createReadStream(fname);
}

var getName = function(name) {
  return path.join(__dirname, name);
}

var removeDb = function(db, done) {
  function afterClosing(err) {
    if (err)
      done(err);
    else
      levelup.destroy(db.dbname, done);
  }
  db.db.close(afterClosing);
}

describe("store()", function() {

  it("should create a db", function(done) {
    var dbname = getName('db/test1');
    var db     = store({ 'dbname': dbname});
    
    db.on('ready', function() {
      assert.ok(db.db.isOpen);
      removeDb(db, done);
    });

    db.on('error', done);
  });
});

describe("#put", function(done) {
  var db;
  before(function(done) {
    db = store( {'dbname': getName('db/test2')} );
    db.on('error', done);
    db.on('ready', done);
  });

  after(function(done) {
    removeDb(db, done);
  });

  describe("store data", function() {

    it("should store with callback", function(done) {
      db.put("key", new Buffer(32), done);
    });

    it("should store with streams", function(done) {
      var put  = db.put("key");
      var file = read('tf0');

      put.on('error', done);
      file.on('end', done);

      file.pipe(put);
    });
  });

  it.skip("should store piped data", function() {
  });

  it.skip("should throw errors with callback", function() {
  });

  it.skip("should throw errors with pipes", function() {
  });
});

describe.skip("#get", function() {
  describe("get data", function() {

    it("should get with callback", function(done) {
      db.put("uuid1", "somevalue", done);
    });

    it.skip("should get with streams", function(done) {
    });
  });
});
