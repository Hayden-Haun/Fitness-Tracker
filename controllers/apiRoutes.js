const router = require("express").Router();

const db = require("../models");

router.get("/workouts", async (req, res) => {
  try {
    const newestWorkout = await db.Workout.find({}).sort({ day: -1 });
    console.log(newestWorkout.exercises);
    return res.json(newestWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.post("/workouts"),
  async (req, res) => {
    try {
      const newWorkout = Workout.create({});
      return res.json(newWorkout);
    } catch (error) {
      console.log(error);
    }
  };

module.exports = router;
