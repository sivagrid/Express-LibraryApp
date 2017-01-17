var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId =  require('mongodb').ObjectId;


var router = function(nav) {
  bookRouter.use(function(req, res, next) {
    if(!req.user) {
      res.redirect('/');
    }
    next();
  });
  bookRouter.route('/')
  .get(function(req,res) {
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');
      collection.find({}).toArray(function(err, results) {
        res.render('booksList', {
          nav: nav,
          books: results
        });
      });
      db.close();
    });
  });

  bookRouter.route('/:id')
  .get(function(req,res) {
    var id = new objectId(req.params.id);
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');
      collection.findOne({_id: id}, function(err, results) {
        res.render('bookListView', {
          nav: nav,
          book: results
        });
      });
      db.close();
    });
  });

  return bookRouter;
};

module.exports = router;
