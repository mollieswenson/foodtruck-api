import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();


  //note: index gets up to routes (the v1 part),
  //      routes adds on  /foodtruck
  //      this file adds the method (/add)

  // '/v1/foodtruck/add'
  api.post('/add', authenitcate, (req, res) => {
    let newFoodTruck = new FoodTruck();
    newFoodTruck.name = req.body.name;
    newFoodTruck.foodtype = req.body.foodtype;
    newFoodTruck.vegetarian = req.body.vegetarian;
    newFoodTruck.avgcost = req.body.avgcost;
    newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

    //save is a mongoose method
    newFoodTruck.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'FoodTruck saved successfully' });
    });
  });

// '/v1/foodtruck' -- Read
api.get('/', (req, res) => {
  //                   we'll either get back an error, or foodtrucks
  FoodTruck.find({}, (err, foodtrucks) => {
    if (err) {
      res.send(err);
    }
    res.json(foodtrucks);
  });
});

// '/v1/foodtruck/id' --Read 1
//      the colon tells express the following is a parameter
api.get('/:id', (req, res) => {
  FoodTruck.findById(req.params.id, (err, foodtruck) => {
    if (err) {
      res.send(err);
    }
    res.json(foodtruck);
  });
});

// '/v1/foodtruck/:id' --Update
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


// '/v1/foodtruck/:id'  -delete
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

//add review for a specific food truck id
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

//get reviews for a specific food truck id
// '/v1/foodtruck/reviews/:id'
api.get('/reviews/:id', (req, res) => {
  Review.find({foodtruck: req.params.id}, (err, reviews) => {
    if (err) {
      res.send(err);
    }
    res.json(reviews);
  });
});

//get foodtrucks that match a specific foodtype
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

//get vegetarian food by foodtype
api.get('/:vegetarian/:foodtype', (req, res) => {
  FoodTruck.find({
    vegetarian: req.params.vegetarian,
    foodtype: req.params.foodtype
  }, (err, foodtrucks) => {
    if (err) {
      res.send(err);
    }
    res.json(foodtrucks);
  });
});


// add 'recommended' to review schema
// get all the reviews with recommended true
api.get('/reviews/recommended/:recommended', (req, res) => {
  Review.find({recommended: req.params.recommended}, (err, reviews) => {
    if (err) {
      res.send(err);
    }
    res.json(reviews);
  });
});

// only recommended + foodtype trucks
//do i look at reviews or trucks first?
api.get('/reviews/recommended/:recommended/:foodtype', (req, res) => {
  //find all the recommended reviews
  Review.find({recommended: req.params.recommended}, (err, reviews) => {
    if (err) {
      res.send(err);
    }
    //from reviews, get only ids of the trucks
    FoodTruck.find({foodtruck: req.params.id}, (err, foodtrucks) => {
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
}
