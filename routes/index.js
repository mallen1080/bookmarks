var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bookmarks' });
});

router.get('/api/bookmarks', function (req, res, next) {
  db.all("SELECT * FROM bookmarks", function (err, rows) {
    res.send(rows);
  });
});

router.post('/api/bookmarks', function (req, res, next) {
  var name = req.query.name;
  var url = req.query.url;
  db.run("INSERT INTO bookmarks (name, url) VALUES (?,?)", [name, url]);

  db.all("SELECT * FROM bookmarks", function (err, rows) {
    res.send(rows);
  });
});

router.delete('/api/bookmarks', function (req, res, next) {
  var name = req.query.name;
  var url = req.query.url;
  db.run("DELETE FROM bookmarks WHERE name = ? AND url = ?", [name, url]);

  db.all("SELECT * FROM bookmarks", function (err, rows) {
    res.send(rows);
  });
});


module.exports = router;
