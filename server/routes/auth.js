import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login",login)//this is same as app.post

export default router;