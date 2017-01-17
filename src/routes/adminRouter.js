var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [
  {
    title: 'Book One',
    genre: 'Historical Fiction',
    author: 'Authoer James',
    thumbnail: 'http://api.randomuser.me/portraits/thumb/men/58.jpg',
    read: false
  },
  {
    title: 'Book Two',
    genre: 'Mathmatical Fiction',
    author: 'Authoer Ronalds',
    thumbnail: 'http://api.randomuser.me/portraits/thumb/women/56.jpg',
    read: false
  },
  {
    title: 'Book Three',
    genre: 'Geography Fiction',
    author: 'Authoer Chuchu',
    thumbnail: 'http://api.randomuser.me/portraits/thumb/men/29.jpg',
    read: false
  },
  {
    title: 'Book Four',
    genre: 'Historical Fiction',
    author: 'Authoer Gue jun pyo',
    thumbnail: 'http://api.randomuser.me/portraits/thumb/women/56.jpg',
    read: false
  },
  {
    title: 'Book Five',
    genre: 'Scientific Fiction',
    author: 'Guem jan di',
    thumbnail: 'http://api.randomuser.me/portraits/thumb/men/58.jpg',
    read: false
  }
];

var router = function(nav) {
  adminRouter.route('/addBooks')
    .get(function(req, res) {
      var url = 'mongodb://localhost:27017/libraryApp';
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        collection.insertMany(books, function(err, results) {
          res.send(results);
        });
        db.close();
      });
    });
  return adminRouter;
};

module.exports = router;
