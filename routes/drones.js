const express = require('express');
const router = express.Router();

// require the Drone model here
const Drones = require("../models/Drone.model.js"); 

//READ
router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drones.find()
    .then((allTheDronesFromDB) => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log("Retrieved drones from DB:", allTheDronesFromDB);

      res.render("drones/list.hbs", { drones: allTheDronesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

//CREATE
router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form.hbs')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  //console.log(req.body);
  const { name, propellers, maxSpeed } = req.body;
 
  Drones.create({ name, propellers, maxSpeed })
  .then(() => res.redirect('/drones'))
  //.catch(error => next(error));
  .catch(error => res.render('drones/create-form.hbs'));
});

//UPDATE
router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;

  Drones.findById(id)
    .then(droneToEdit => {
      res.render('drones/update-form.hbs', { drone: droneToEdit }); // <-- add this line
    })
    .catch(error => next(error));
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
 
  Drones.findByIdAndUpdate(id, { name, propellers, maxSpeed }, { new: true })
    .then(updatedDrone => res.redirect('/drones')) 
    //.catch(error => next(error));
    .catch(error => res.render('drones/update-form.hbs', { drone: droneToEdit }));
});

//DELETE
router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;
 
  Drones.findByIdAndDelete(id)
    .then(() => res.redirect('/drones'))
    .catch(error => next(error));
});

module.exports = router;
