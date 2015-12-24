var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');
var assign = require('object-assign');

var DB_PATH = __dirname + '/../db.json';

/* GET users listing. */
router.get('/todos', function(req, res, next) {
  fs.readFile(DB_PATH, 'utf8', function(err, text) {
    if (err) return next(err);
    try {
      var posts = JSON.parse(text);
      res.json(posts);
    } catch (e) {
      next(err);
    }
  });
});

router.post('/todos', function(req, res, next) {
  var text = req.body.text;
  fs.readFile(DB_PATH, 'utf8', function(err, data) {
    if (err) return next(err);
    var posts;
    try {
      posts = JSON.parse(data);
    } catch (e) {
      return next(err);
    }
    var newPost = {
      id: Math.max(_.pluck(posts, 'id')) + 1,
      text: text,
      isCompleted: false
    };
    posts.push(newPost);
    fs.writeFile(DB_PATH, JSON.stringify(posts), function(err) {
      if (err) return next(err);
      res.json(newPost);
    });
  });
});

router.put('/todos/:id', function(req, res, next) {
  var id = +req.params.id;
  var isCompleted = req.query.isCompleted === '1';
  fs.readFile(DB_PATH, 'utf8', function(err, data) {
    if (err) return next(err);
    var posts;
    try {
      posts = JSON.parse(data);
    } catch (e) {
      return next(err);
    }
    posts = posts.map(function(post) {
      return post.id === id ? assign({}, post, {
        isCompleted: isCompleted
      }) : post;
    });
    fs.writeFile(DB_PATH, JSON.stringify(posts), function(err) {
      if (err) return next(err);
      res.json({
        success: true
      });
    });
  });
});

router.delete('/todos/:id', function(req, res, next) {
  var id = +req.params.id;
  fs.readFile(DB_PATH, 'utf8', function(err, data) {
    if (err) return next(err);
    var posts;
    try {
      posts = JSON.parse(data);
    } catch (e) {
      return next(err);
    }
    posts = posts.filter(function(post) {
      return post.id !== id;
    });
    fs.writeFile(DB_PATH, JSON.stringify(posts), function(err) {
      if (err) return next(err);
      res.json({
        success: true
      });
    });
  });
});

module.exports = router;
