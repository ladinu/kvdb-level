var assert    = require('assert');
var os        = require('os');
var path      = require('path');
var uuid      = require('uuid');
var levelup   = require('levelup');
var test      = require('tap').test;
var store;


test("load module kvdb-level", function(t) {
  t.doesNotThrow(function() {
    store = require('../');
  });
  t.end();
});


test("database creation test", function(t) {
  
  t.test("should create a db", function(t) {

  });

  t.test("db name should be setable", function(t) {

  });

  t.test("when name not given, db must be created with random name", function(t) {

  });
});

// describe("ctor", function() {
// 
//   it("should create a db", function(done) {
//     var db = store( {'dbname': './db/testdb1.db'} );
//     
//     db.on('ready', function() {
//       done(assert.ok(db.db.isOpen));
//     })
// 
//     db.on('error', function(err) {
//       done(err);
//     });
//   });
// 
//   it("should create db with specified name", function() {
//     throw new Error("IMPLEMENT");
//   });
// 
//   it("should create a db when no name is given", function() {
//     throw new Error("IMPLEMENT");
//   });
// 
//   it("should create a db in specefied path", function() {
//     throw new Error("IMPLEMENT");
//   });
// 
//   it("should create a db in cwd when path not given", function() {
//     throw new Error("IMPLEMENT");
//   });
// 
// });
// 
// describe("#put", function() {
//   it("should store data", function() {
//     throw new Error("IMPLEMENT");
//   });
// 
//   it("should store piped data", function() {
//     throw new Error("IMPLEMENT");
//   });
// 
//   it("should throw errors by callback or streams", function() {
//     throw new Error("IMPLEMENT");
//   });
// });
