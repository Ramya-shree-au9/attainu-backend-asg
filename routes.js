import express from "express";
import {
  register,
  login,
  loginradomuser,
  allPostspaginate,
  createPosts,
  updatePosts,
  deletePosts

} from "./Controller.js";

import { validate} from './checkvalidate.js'

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/loginradomuser", loginradomuser);
router.get("/allPosts",validate, allPostspaginate);
router.post("/createposts",validate, createPosts);
router.patch("/updatePosts/:id",validate, updatePosts);
router.delete("/deletePosts/:id",validate, deletePosts);


export default router;