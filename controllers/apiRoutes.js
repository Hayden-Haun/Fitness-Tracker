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

router.post("/workouts", async (req, res) => {
  try {
    const newWorkout = await db.Workout.create(req.body);
    return res.json(newWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.put("/workouts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.params.body;
    const updatedWorkout = await db.Workout.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          exercises: body,
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
});

module.exports = router;
