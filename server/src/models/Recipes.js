import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  imageUrl: { type: String, required: true },
  instructions: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  recipeOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Recipe = mongoose.model("recipes", RecipeSchema);
export default Recipe;
