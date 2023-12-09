import Recipes from "../models/Recipes.js";
import User from "../models/Users.js";

export const getAllRecipe = async (req, res) => {
  try {
    const allRecipes = await Recipes.find();
    if (!allRecipes.length) {
      return res.status(404).json({ error: "No recipes found" });
    }
    return res.status(200).json(allRecipes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const createRecipe = async (req, res) => {
  const {
    title,
    ingredients,
    instructions,
    imageUrl,
    cookingTime,
    recipeOwner,
  } = req.body;
  if (
    !title ||
    !ingredients ||
    !instructions ||
    !imageUrl ||
    !cookingTime ||
    !recipeOwner
  ) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const recipe = new Recipes({
    title,
    ingredients,
    instructions,
    imageUrl,
    cookingTime,
    recipeOwner,
  });

  try {
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: err.message, message: "Something went wrong" });
  }
};

// export const savedRecipe = async (req, res) => {
//   try {
//     const { userID, recipeID } = req.params;
//     const recipe = await Recipes.findById(recipeID);
//     const user = await User.findById(userID);
//     user.savedRecipes.push(recipe);
//     await user.save();

//     res.status(200).json({ savedRecipe: user.savedRecipes });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ error: err.message, message: "Something went wrong" });
//   }
// };

export const savedRecipe = async (req, res) => {
  // Get the user ID and recipe ID from the request parameters.
  const { userID, recipeID } = req.body;
  // Validate the user ID and recipe ID.
  if (!userID || !recipeID) {
    return res.status(400).json({ error: "Invalid user ID or recipe ID" });
  }
  // Check if the user exists.
  const user = await User.findById(userID);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if the recipe exists.
  const recipe = await Recipes.findById(recipeID);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  // Add the recipe ID to the user's saved recipes field.
  user.savedRecipes.push(recipeID);

  // Save the user's changes.
  try {
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }

  // Return the saved recipe.
  res.status(200).json({ savedRecipe: user.savedRecipes });
};

export const getAllUserSavedRecipe = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const getAllSavedRecipe = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const savedRecipes = await Recipes.find({
      _id: { $in: user.savedRecipes },
    });
    res.status(200).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
