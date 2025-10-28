require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const workoutsRoutes = require("./routes/workouts");

// ---------------------- MIDDLEWARE ----------------------
app.use(express.json());

// ---------------------- ROUTES ----------------------
app.use("/api/workouts", workoutsRoutes);

// ---------------------- DATABASE ----------------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connect to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
