require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const MONGO_URI = process.env.MONGO_URI;
// const MONGO_URI = "mongodb://localhost:27020/pollDB";

const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/check", (req, res) => {
  res.json("Working");
});

app.use("/api", require("./routes/poll.route"));

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, response) => {
    if (err) {
      console.log(err);
    }
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  }
);
