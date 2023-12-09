import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createRecipe,
  getAllRecipe,
  getAllSavedRecipe,
  savedRecipe,
  getAllUserSavedRecipe,
} from "../controller/recipe.js";

const router = express.Router();

router.get("/all", getAllRecipe);
router.post("/create", verifyToken, createRecipe);
router.put("/saved-recipe", verifyToken, savedRecipe);
router.get(
  "/getAllSavedRecipe/ids/:userID",
  verifyToken,
  getAllUserSavedRecipe
);
router.get("/getAllSavedRecipe/:userID", verifyToken, getAllSavedRecipe);

export { router as recipesRouter };
