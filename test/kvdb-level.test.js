var assert    = require('assert');
var os        = require('os');
var path      = require('path');
var uuid      = require('uuid');
var levelup   = require('levelup');
var store     = require('../');

var testdir = uuid.unparse(uuid.v4(null, new Buffer(16), 0)) + '/';
var tmpdir  = path.join(os.tmpdir(), testdir);

var dbpath = function(name) {
  return path.join(tmpdir, name);
}

describe("ctor", function() {

  it("should create a db", function(done) {
    var db = store( {'dbname': '../db/testdb1'} );
    
    db.on('ready', function() {
      done(assert.ok(db.db.isOpen));
    })

    db.on('error', function(err) {
      done(err);
    });
  });

  it("should create db with specified name", function() {
    throw new Error("IMPLEMENT");
  });

  it("should create a db when no name is given", function() {
    throw new Error("IMPLEMENT");
  });

  it("should create a db in specefied path", function() {
    throw new Error("IMPLEMENT");
  });

  it("should create a db in cwd when path not given", function() {
    throw new Error("IMPLEMENT");
  });

});

describe("#put", function() {
  it("should store data", function() {
    throw new Error("IMPLEMENT");
  });

  it("should store piped data", function() {
    throw new Error("IMPLEMENT");
  });

  it("should throw errors by callback or streams", function() {
    throw new Error("IMPLEMENT");
  });
});
