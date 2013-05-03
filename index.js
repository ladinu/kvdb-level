var levelup = require('levelup');
var uuid    = require('uuid');
var path    = require('path');


function someDBName(cwd) {
  var dbname = uuid.v4(null, new Buffer(16), 0);
  dbname     = uuid.unparse(dbname) + '/';
  return path.join(cwd, dbname);
}

function Leveldb(options) {
  var cwd    = options.cwd    || __dirname;
  var dbname = options.dbname || someDBName(cwd);
  var db     = levelup(dbname);
}

Leveldb.prototype.get = function(key, options, callback) {
  if (callback {
    this.store.get(key, callback);
  } else { // Return a stream
    return this.store.get(key);
  }
}

Leveldb.prototype.put = function(key, value, options, callback) {
  if (callback) {
    this.store.put(key, value, callback);
  } else {
    return this.store.put(key);
  }
}

Leveldb.prototype.del = function(key, options, callback) {
  this.store.del(key, callback);
}

module.exports = store;
function store(options) {
  return new Leveldb(options);
}



