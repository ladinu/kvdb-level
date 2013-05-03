var assert    = require('assert');
var uuid      = require('uuid');
var levelup   = require('levelup');
var test      = require('tap').test;
var store     = require('../');

function log() {
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(this, ["DEBUG: "].concat(args));
}



describe("ctor", function() {

  it("should create a db", function(done) {
    var db = store( {'dbpath': process.cwd()} );
    
    db.on('ready', function() {
      done(assert.ok(db.db.isOpen));
    })

    db.on('error', function(err) {
      done(err);
    });
  });

  it.skip("should create db with specified name", function() {
    throw new Error("IMPLEMENT");
  });

  it.skip("should create a db when no name is given", function() {
    throw new Error("IMPLEMENT");
  });

  it.skip("should create a db in specefied path", function() {
    throw new Error("IMPLEMENT");
  });

  it.skip("should create a db in cwd when path not given", function() {
    throw new Error("IMPLEMENT");
  });

});

describe.skip("#put", function() {
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
