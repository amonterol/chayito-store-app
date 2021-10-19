//Modelo de la categoria de cada producto
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

module.exports =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
