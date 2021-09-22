const router = require("express").Router();

const db = require("../models");

router.get("/workouts", async (req, res) => {
  try {
    const newestWorkout = await db.Workout.findOne({}).sort({ day: -1 });
    console.log(newestWorkout.exercises);
    res.json(newestWorkout);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
