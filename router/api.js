/**
 * Created by neox on 3/23/16.
 */

var express = require('express');
//var db = require('../stock/stock_db');
var dbHandler = require('../stock/stock_db_handler');

var router = express.Router();

router.get('/', function (req, res) {
  res.render('stock/list', {});
});

router.get('/lists', function (req, res) {
  console.log('stock get lists');
  dbHandler.getKospiList()
    .then(function (companyList) {
      console.log('stock get end');
      var subList = companyList.slice(0);
      res.json(subList);
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
