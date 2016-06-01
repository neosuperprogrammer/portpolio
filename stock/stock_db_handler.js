/**
 * Created by neox on 3/18/16.
 */

(function () {
  var db = require('./stock_db');

  //console.log(this);
  var root = this;

  // Create a safe reference to the Underscore object for use below.
  var dbHandler = function (obj) {
    if (obj instanceof dbHandler) return obj;
    if (!(this instanceof dbHandler)) return new dbHandler(obj);
    this._wrapped = obj;
    this._init();
  }

  dbHandler.prototype._init = function () {
    initialize()
      .then(function() {
        console.log('build model success');
      })
  };

  exports = module.exports = dbHandler();

  function initialize() {
    return db.buildModel();
  }

  function getCompanyListFromDB(collection) {
    var companyList = null;
    var dbConnection = null;
    return db.openDB(collection)
      .then(function (connection) {
        dbConnection = connection;
        return db.getCompanyListPerPage();
      })
      .then(function(list) {
        companyList = list;
        return db.closeDB(dbConnection);
      })
      .then(function() {
        return companyList;
      })
  }

  //function getKospiList() {
  //  return getCompanyListFromDB('kospi');
  //}

  dbHandler.prototype.getKospiList = function() {
    return getCompanyListFromDB('kospi');
  };

  //function getKosdaqList() {
  //  return getCompanyListFromDB('kosdaq');
  //}

  function closeDB() {
    return db.closeDB();
  }



}.call(this));