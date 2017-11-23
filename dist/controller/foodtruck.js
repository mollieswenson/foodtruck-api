'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _foodtruck = require('../model/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

var _review = require('../model/review');

var _review2 = _interopRequireDefault(_review);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  //note: index gets up to routes (the v1 part),
  //      routes adds on  /foodtruck
  //      this file adds the method (/add)

  // '/v1/foodtruck/add'
  api.post('/add', authenitcate, function (req, res) {
    var newFoodTruck = new _foodtruck2.default();
    newFoodTruck.name = req.body.name;
    newFoodTruck.foodtype = req.body.foodtype;
    newFoodTruck.vegetarian = req.body.vegetarian;
    newFoodTruck.avgcost = req.body.avgcost;
    newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

    //save is a mongoose method
    newFoodTruck.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'FoodTruck saved successfully' });
    });
  });

  // '/v1/foodtruck' -- Read
  api.get('/', function (req, res) {
    //                   we'll either get back an error, or foodtrucks
    _foodtruck2.default.find({}, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  // '/v1/foodtruck/id' --Read 1
  //      the colon tells express the following is a parameter
  api.get('/:id', function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      res.json(foodtruck);
    });
  });

  // '/v1/foodtruck/:id' --Update
  api.put('/:id', _authMiddleware.authenticate, function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      foodtruck.name = req.body.name;
      foodtruck.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "FoodTruck updated succesfully" });
      });
    });
  });

  // '/v1/foodtruck/:id'  -delete
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _foodtruck2.default.remove({
      _id: req.params.id
    }, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "FoodTruck removed" });
    });
  });

  //add review for a specific food truck id
  // '/v1/foodtruck/reviews/add/:id'
  api.post('/reviews/add/:id', _authMiddleware.authenticate, function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      var newReview = new _review2.default();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.recommended = req.body.recommended;
      newReview.foodtruck = foodtruck._id;
      newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }
        foodtruck.reviews.push(newReview);
        foodtruck.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Food truck review saved' });
        });
      });
    });
  });

  //get reviews for a specific food truck id
  // '/v1/foodtruck/reviews/:id'
  api.get('/reviews/:id', function (req, res) {
    _review2.default.find({ foodtruck: req.params.id }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  //get foodtrucks that match a specific foodtype
  // '/v1/foodtruck/foodtype/:foodtype'
  api.get('/foodtype/:foodtype', function (req, res) {
    _foodtruck2.default.find({
      foodtype: req.params.foodtype }, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  //get vegetarian food by foodtype
  api.get('/:vegetarian/:foodtype', function (req, res) {
    _foodtruck2.default.find({
      vegetarian: req.params.vegetarian,
      foodtype: req.params.foodtype
    }, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  // add 'recommended' to review schema
  // get all the reviews with recommended true
  api.get('/reviews/recommended/:recommended', function (req, res) {
    _review2.default.find({ recommended: req.params.recommended }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  // only recommended + foodtype trucks
  //do i look at reviews or trucks first?
  api.get('/reviews/recommended/:recommended/:foodtype', function (req, res) {
    //find all the recommended reviews
    _review2.default.find({ recommended: req.params.recommended }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      //from reviews, get only ids of the trucks
      _foodtruck2.default.find({ foodtruck: req.params.id }, function (err, foodtrucks) {
        if (err) {
          res.send(err);
        }
        res.json(foodtrucks);
      });
    });
  });

  //get vegetarian food trucks
  // api.get('/vegetarian/:vegetarian', (req, res) => {
  //   FoodTruck.find({vegetarian: req.params.vegetarian}, (err, foodtrucks) => {
  //     if (err) {
  //       res.send(err);
  //     }
  //     res.json(foodtrucks);
  //   });
  // });


  //get only food trucks that have reviews


  return api;
};
//# sourceMappingURL=foodtruck.js.map