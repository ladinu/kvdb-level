var assert    = require('assert');
var path      = require('path');
var fs        = require('fs');

var uuid      = require('uuid');
var compare   = require('equal-streams');
var levelup   = require('levelup');
var store     = require('../');

var log = function() {
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(this, ['@debug: '].concat(args));
}


var read = function(fname) {
  return fs.createReadStream(getName(fname));
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

describe('store()', function() {

  it('should create a db', function(done) {
    var dbname = getName('db/test1');
    var db     = store({ 'dbname': dbname});
    
    db.on('ready', function() {
      assert.ok(db.db.isOpen);
      removeDb(db, done);
    });

    db.on('error', done);
  });
});

// Create a db
var db;
before(function(done) {
  db = store( {'dbname': getName('db/test2')} );
  db.on('error', done);
  db.on('ready', done);
});

after(function(done) {
  removeDb(db, done);
});

describe('#put', function(done) {
  it('should store with callback', function(done) {
    db.put('tstkey0', 'tst0string', done);
  });

  it('should store with streams', function(done) {
    var put  = db.put('tstkey1');
    var file = read('tf0');

    put.on('error', done);
    file.on('end', done);

    file.pipe(put);
  });
});

describe('#get', function() {

  it('should get with callback', function(done) {
    db.get('tstkey0', function(err, value) {
      if (!err) 
        done(assert.equal(value, 'tst0string'));
      else
        done(err);
    });
  });

  it('should get with streams', function(done) {
    var get = db.get('tstkey1');

    get.on('error', done);
    compare(get, read('tf0'), function(err, result) {
      if (result) {
        done()
      } else if (err) {
        done(err);
      } else {
        done(new Error('Diffrent streams were returned'));
      }
    });
  });

  it('should get all keys', function(done) {
    var keyStream = db.get( {'keys': true, 'values': false} );
    var keyCount = 2;

    keyStream.on('data', function(key) {  
      if ( (key === 'tstkey1') || (key === 'tstkey0') )
        --keyCount;
    });

    keyStream.on('end', function() {
      if (keyCount === 0)
        done()
      else
        done(new Error('Could not get all keys from db'));
    });

    keyStream.on('error', done);
  });

  it.skip('should get all values', function(done) {
    var keyStream = db.get( {'values': true} );
  });
});
