/**
 * Created by neox on 3/18/16.
 */

var express = require('express');
//var db = require('../stock/stock_db');
var dbHandler = require('../stock/stock_db_handler');

var router = express.Router();

//var items = [
//  {id: 1, desc: 'item 1'},
//  {id: 2, desc: 'item 2'}
//];

router.get('/', function (req, res) {
  res.render('stock/list', {});
});

router.get('/lists', function (req, res) {
  dbHandler.getKospiList()
    .then(function (companyList) {
      res.json(companyList);
      //res.render('stock/list', {
      //  result: 'success',
      //  companyList: companyList
      //});
    })
    .catch(function (err) {
      console.log(err);
      res.json({});
    });
});

module.exports = router;
