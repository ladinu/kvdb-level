var assert    = require('assert');
var path      = require('path');
var uuid      = require('uuid');
var levelup   = require('levelup');
var store     = require('../');

function log() {
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(this, ["DEBUG: "].concat(args));
}


function getName(name) {
  return path.join(__dirname, name);
}

describe("store()", function() {

  it("should create a db", function(done) {

    var dbname  = getName('db/test1');
    log(dbname);
    var db = store({ 'dbname': dbname});
    
    db.on('ready', function() {
      function whenClosed(err) {
        if (!err) {
          levelup.destroy(dbname, done);
        } else {
          done(err);
        }
      }
      assert.ok(db.db.isOpen);
      db.db.close(whenClosed);
    });

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
