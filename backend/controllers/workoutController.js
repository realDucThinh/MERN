const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
  const id = req.params.id;

  //kiem tra id co hop le hay khong
  //validate mongoose id: neu id khong du 24 ki tu hex thi khong hop le
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "not found workout!" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "not found workout!" });
  }
  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill in all the fields", emptyFields });
  }

  //them document vao database
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const id = req.params.id;
  //validate mongoose id: neu id khong du 24 ki tu hex thi khong hop le
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "not found workout!" });
  }
  //_id là tên trường trong cơ sở dữ liệu, còn id là giá trị bạn truyền vào từ phía client.
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "not found workout!" });
  }
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "not found workout!" });
  }
  //{ ...req.body } <=> { title: req.body.title, load: req.body.load, reps: req.body.reps}
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "not found workout!" });
  }
  res.status(200).json({ workout });
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
