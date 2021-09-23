const router = require("express").Router();

const db = require("../models");

//Create GET route to retrieve most recent workout
router.get("/workouts", async (req, res) => {
  try {
    // const aggregateData = await db.Workout.aggregate([
    //   {
    //     $addFields: {
    //       totalDuration: { $sum: "$exercises.duration" },
    //       totalWeight: { $sum: "$exercises.weight" },
    //       totalSets: { $sum: "$exercises.sets" },
    //       totalReps: { $sum: "$exercisesreps" },
    //     },
    //   },
    // ]);

    await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
          totalWeight: { $sum: "$exercises.weight" },
          totalSets: { $sum: "$exercises.sets" },
          totalReps: { $sum: "$exercises.reps" },
          totalDistance: { $sum: "$exercises.distance" },
        },
      },
    ]);

    const newestWorkout = await db.Workout.find({}).sort({ day: 1 });

    console.log(newestWorkout);
    return res.json(newestWorkout);
  } catch (error) {
    console.log(error);
  }
});

//Create a new workout
router.post("/workouts", async (req, res) => {
  try {
    const newWorkout = await db.Workout.create(req.body);
    res.json(newWorkout);
  } catch (error) {
    console.log(error);
  }
});

//Add an exercise to the most recent workout
router.put("/workouts/:id", async (req, res) => {
  try {
    const updatedWorkout = await db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          exercises: req.body,
        },
      }
    );
    res.json(updatedWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.get("/workouts/range", async (req, res) => {
  try {
    const aggregateData = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
          totalWeight: { $sum: "$exercises.weight" },
          totalSets: { $sum: "$exercises.sets" },
          totalReps: { $sum: "$exercises.reps" },
          totalDistance: { $sum: "$exercises.distance" },
        },
      },
    ]);

    // const aggregateData = await db.Workout.find({});
    // console.log(aggregateData);
    res.json(aggregateData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
