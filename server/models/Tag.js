const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      maxlength: 32,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
