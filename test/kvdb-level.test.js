var assert    = require('assert');
var path      = require('path');
var uuid      = require('uuid');
var levelup   = require('levelup');
var store     = require('../');

var log = function() {
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(this, ["DEBUG: "].concat(args));
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
  })

  it("should store data", function(done) {
    done();
  });

  it.skip("should store piped data", function() {
  });

  it.skip("should throw errors with callback", function() {
  });

  it.skip("should throw errors with pipes", function() {
  });
});

describe.skip("#get", function() {

});
