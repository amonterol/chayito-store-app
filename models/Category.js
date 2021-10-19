const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

//module.exports = mongoose.model("Category", categorySchema);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
