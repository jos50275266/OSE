const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    thumbnail: {
      image: {
        url: String,
        key: String,
      },
    },

    title: {
      type: String,
      min: 5,
    },

    excerpt: {
      type: String,
      max: 100,
    },

    body: {
      type: {},
      required: true,
      min: 200,
      max: 200000,
    },

    created_at: {
      type: Date,
      default: Date.now,
    },

    categories: [
      {
        type: ObjectId,
        ref: "Category",
      },
    ],

    tags: [
      {
        type: ObjectId,
        ref: "Tag",
      },
    ],

    references: [
      {
        type: ObjectId,
        ref: "Reference",
      },
    ],

    like: {
      type: [{ type: ObjectId, ref: "User" }],
    },

    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = {
  Blog,
};
