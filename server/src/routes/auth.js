import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { login, register } from "../controller/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export { router as authRouter };
