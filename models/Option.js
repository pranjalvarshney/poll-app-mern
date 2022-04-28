const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    pollId: {
      type: mongoose.Schema.ObjectId,
      ref: "Poll",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Option", OptionSchema);
