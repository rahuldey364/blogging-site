const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  body: {
    type: String,
    required: [true, "Blog content is required"],
  },
  authorId: {
    type: ObjectId,
    ref: "Author",
    required: [true, "Author Id is required"],
  },
  tags: [String],
  category: {
    type: [String],
    required: true
  },
  subcategory: [String],
  deletedAt: {
    type: Date,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
