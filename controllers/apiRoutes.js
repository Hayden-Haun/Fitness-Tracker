const router = require("express").Router();

const db = require("../models");

//Create GET route to retrieve most recent workout
router.get("/workouts", async (req, res) => {
  try {
    const newestWorkout = await db.Workout.find({}).sort({ day: 1 });
    console.log(newestWorkout.exercises);
    return res.json(newestWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.post("/workouts"),
  async (req, res) => {
    try {
      const newWorkout = await Workout.create(req.body);
      res.json(newWorkout);
    } catch (error) {
      console.log(error);
    }
  };

router.put("/workouts/:id"),
  async (req, res) => {
    try {
      const updatedWorkout = await db.Workout.findByIdAndUpdate(
        req.params.id,

        {
          $push: {
            exercises: req.body,
          },
        },
        {
          new: true,
        }
      );
      return res.json(updatedWorkout);
    } catch (error) {
      console.log(error);
    }
  };

module.exports = router;
