import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter } from "./src/routes/auth.js";
import { recipesRouter } from "./src/routes/recipe.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//ROUTES//
app.get("/", (req, res) => {
  res.send("Api Running Successfully :)");
});

app.use("/auth", authRouter);
app.use("/recipe", recipesRouter);

const PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(`Error: ${error}`));
