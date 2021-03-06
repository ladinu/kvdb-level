var util    = require('util');
var path    = require('path');
var events  = require('events');
var stream  = require('stream');

var BufferStream = require('bufferstream');
var duplexer     = require('duplexer');
var levelup      = require('levelup');
var uuid         = require('uuid');


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
  var options  = options  || {'keys': false, 'values': true};
  var key      = key      || false;
  var callback = callback || null;

  if (typeof(options) === 'function')
    callback = options;

  if ( (typeof(key) === 'object') && !(key instanceof Buffer) ) {
    options = key;
    key = false;
  }

  if (callback) {
    this.db.get.apply(this.db, arguments);
  } else if (key) { // Return a stream

    // Again, bufferring is not really a good idea
    // In the future this do things like level-store 
    var stream = new BufferStream();

    this.db.get(key, options, function(err, data) {
      if (err) return stream.emit('error', err);
      stream.end(data);
    });
    return stream;
  } else { // Get all keys or values
    return this.db.createReadStream(options)
  }
}

Leveldb.prototype.put = function(key, value, options, callback) {
  var self    = this;
  var options = options || {};

  if (typeof(options) === 'function')
    var callback = options;

  if (callback) {                               // Callback API
    this.db.put.apply(this.db, arguments);
  } else {                                      // Stream API
    // First argument is `key` and second argument is `options`
    // Treat second argument as the `options` object
    var options = value || { 'size': 'flexible' };

    // When using levelup/leveldown the value cannot be a stream
    //
    // level-store fix this by monotonically increasing the key
    // and writing to that key whenever data is recevied
    //
    // Naive way to fix this is by buffering the stream and writing
    // after the stream close (not really a good idea). This will
    // need to get fixed in the future.

    var catchStream = new BufferStream(options);
    var putStream   = new stream.Readable();

    putStream._read = function(){}

    catchStream.on('end', function() {
      var whenPut = function(err) {
        if (err) putStream.emit('error', err);
      }
      self.put(key, catchStream.buffer, options, whenPut);
    });

    catchStream.on('error', function(err) {
      putStream.emit('error', err);
    });

    return duplexer(catchStream, putStream);
  }
}

Leveldb.prototype.del = function(key, options, callback) {
  this.db.del.apply(this.db, arguments);
}

module.exports = store;

function store(options) {
  return new Leveldb(options);
}
