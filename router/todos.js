/**
 * Created by neox on 3/18/16.
 */

var express = require('express');
var path = require('path');
var fs = require('fs');

var router = express.Router();

var items = [
  {id: 1, desc: 'item 1'},
  {id: 2, desc: 'item 2'}
];

router.get('/', function (req, res) {
  res.render('index', {
    title: 'test',
    items: items
  });
});


router.get('/test', function (req, res) {
  //var filename = path.join(process.cwd(), name); //Create filename
  var filename = path.join(process.cwd(), 'portpolio/toplist/index.html'); //Create filename
  fs.readFile(filename, "binary", function (err, file) {
//Read file
    if (err) {
// Tracking Errors
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write(err + "\n");
      res.end();
      return;
    }
    res.writeHead(200);
    //Header request response
    res.write(file, "binary");
    //Sends body response
    res.end();
    //Signals to server that
  });
});

router.post('/add', function (req, res) {
  var newItem = req.body.newItem;
  items.push({
    id: items.length + 1,
    desc: newItem
  });
  //console.log(req.body.newItem);
  res.redirect('/');
});

module.exports = router;
