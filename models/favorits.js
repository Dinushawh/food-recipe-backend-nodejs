const mongoose = require("mongoose");
const schema = mongoose.Schema;

const favoritsSchema = new schema({
  userid: {
    type: String,
    required: [true, "User id is required"],
  },
  strMeal: {
    type: String,
    required: [true, "Favorits is required"],
  },
  strCategory: {
    type: String,
    required: [true, "Favorits is required"],
  },
  strMealThumb: {
    type: String,
    required: [true, "Favorits is required"],
  },
  strInstructions: {
    type: String,
    required: [true, "Favorits is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("favorits", favoritsSchema);
