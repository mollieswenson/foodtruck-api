import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();


// GET all food trucks
// '/v1/foodtruck'
api.get('/', (req, res) => {
  FoodTruck.find({}, (err, foodtrucks) => {
    if (err) {
      res.send(err);
    }
    res.json(foodtrucks);
  });
});


// GET a single food truck by id
// '/v1/foodtruck/id'
api.get('/:id', (req, res) => {
  FoodTruck.findById(req.params.id, (err, foodtruck) => {
    if (err) {
      res.send(err);
    }
    res.json(foodtruck);
  });
});


// GET a list of food trucks by foodtype
// '/v1/foodtruck/foodtype/:foodtype'
api.get('/foodtype/:foodtype', (req, res) => {
  FoodTruck.find({
    foodtype: req.params.foodtype}, (err, foodtrucks) => {
    if (err) {
      res.send(err);
    }
    res.json(foodtrucks);
  });
});


// POST add new food truck
// '/v1/foodtruck/add'
api.post('/add', authenticate, (req, res) => {
  let newFoodTruck = new FoodTruck();
  newFoodTruck.name = req.body.name;
  newFoodTruck.foodtype = req.body.foodtype;
  newFoodTruck.vegetarian = req.body.vegetarian;
  newFoodTruck.avgcost = req.body.avgcost;
  newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;
  newFoodTruck.save(err => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'FoodTruck saved successfully' });
  });
});


//PUT update existing food truck
// '/v1/foodtruck/:id'
api.put('/:id', authenticate, (req, res) => {
  FoodTruck.findById(req.params.id, (err, foodtruck) => {
    if (err) {
      res.send(err);
    }
    foodtruck.name = req.body.name;
    foodtruck.save(err => {
      if (err) {
        res.send(err);
      }
      res.json( { message: "FoodTruck updated succesfully"});
    });
  });
});

//DELETE food truck
// '/v1/foodtruck/:id'
api.delete('/:id', authenticate, (req, res) => {
  FoodTruck.remove({
    _id: req.params.id
  }, (err, foodtruck) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "FoodTruck removed"});
  });
});


//    #####  REVIEWS

// POST add a review by food truck id
// '/v1/foodtruck/reviews/add/:id'
api.post('/reviews/add/:id', authenticate, (req, res) => {
  FoodTruck.findById(req.params.id, (err, foodtruck) => {
    if (err) {
      res.send(err);
    }
    let newReview = new Review();
    newReview.title = req.body.title;
    newReview.text = req.body.text;
    newReview.recommended = req.body.recommended;
    newReview.foodtruck = foodtruck._id;
    newReview.save((err, review) => {
      if (err) {
        res.send(err);
      }
      foodtruck.reviews.push(newReview);
      foodtruck.save(err => {
        if (err) {
          res.send(err);
        }
        res.json( { message: 'Food truck review saved'})
      });
    });
  });
});


// GET a list of reviews by food truck id
// '/v1/foodtruck/reviews/:id'
api.get('/reviews/:id', (req, res) => {
  Review.find({foodtruck: req.params.id}, (err, reviews) => {
    if (err) {
      res.send(err);
    }
    res.json(reviews);
  });
});


return api;
}
