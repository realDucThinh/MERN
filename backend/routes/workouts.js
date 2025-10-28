const express = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

// controller functions

//get all workouts
router.get("/", getWorkouts);

//get 1 workouts
router.get("/:id", getWorkout);

//post 1 workouts
router.post("/", createWorkout);

//update 1 workouts
router.patch("/:id", updateWorkout);

//delete 1 workouts
router.delete("/:id", deleteWorkout);

module.exports = router;
