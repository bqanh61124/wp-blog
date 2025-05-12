const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, "Please provide slug"],
    unique: [true, "Slug already exists"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title!"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description!"],
  },
  content: {
    type: String,
    required: [true, "Please provide content!"],
  },
  author: {
    type: String,
    required: [true, "Please provide author name!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.models.Posts || mongoose.model("Posts", PostSchema); 