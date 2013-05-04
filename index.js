var util    = require('util');
var path    = require('path');
var events  = require('events');
var levelup = require('levelup');
var uuid    = require('uuid');


function someDBName() {
  var dbname = uuid.v4(null, new Buffer(16), 0);
  dbname     = uuid.unparse(dbname) + '/';
  return path.join(__dirname, dbname);
}

function Leveldb(options) {
  events.EventEmitter.call(this);
  var self = this;

  var options = options        || {};
  var dbname  = options.dbname || someDBName();

  self.dbname = dbname;
  self.db;
  
  levelup(dbname, options, function(err, db) {
    if (err) { 
      self.emit('error', err);
    } else {
      self.db = db;
      self.emit('ready');
    }
  });
}

util.inherits(Leveldb, events.EventEmitter);

Leveldb.prototype.get = function(key, options, callback) {
  if (callback) {
    this.db.get(key, callback);
  } else { // Return a stream
    return this.db.get(key);
  }
}

Leveldb.prototype.put = function(key, value, options, callback) {
  if (typeof(options) === 'function')
    callback = options;

  if (callback) {
    this.db.put(key, value, options, callback);
  } else {
    console.log(callback);
    return this.db.put(key);
  }
}

Leveldb.prototype.del = function(key, options, callback) {
  this.db.del(key, callback);
}

module.exports = store;

function store(options) {
  return new Leveldb(options);
}



