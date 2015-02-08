function Db(dbConfig) {

  this.mongoose = require("mongoose");
  this.cfg = dbConfig;
  this.models = {};

}

Db.prototype.init = function init(callback) {
  var db_uri = "mongodb://" + this.cfg.db_host + "/" + this.cfg.db_name;
  this.mongoose.connect(db_uri, this.cfg.db_opts);
  var conn = this.mongoose.connection;

  conn.on('error', function(err) {
    callback(new Error('connection error: %s', err));
  });


  conn.once('open', function() {
    this.cfg.models.forEach(function(el, idx, arr) {
      console.log("schema : %s, model %s", el.schema, el.model);
      this.addModel(el.model, this.getSchema(el.schema));
    }.bind(this));
    callback();
  }.bind(this));


};

Db.prototype.get = function get(modelName) {
  return this.getModel(modelName);
};

Db.prototype.getModel = function getModel(modelName) {
  return this.models[modelName];
};

Db.prototype.addModel = function addModel(modelName, schema) {
  this.models[modelName] = this.mongoose.model(modelName, schema);
};

Db.prototype.getSchema = function getSchema(schemaName) {
  var schema = require("./" + schemaName);
  return schema;
};

Db.prototype.close = function close() {
  this.mongoose.disconnect();
};

module.exports = Db;
