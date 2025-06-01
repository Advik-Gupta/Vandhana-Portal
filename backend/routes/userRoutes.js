import express from "express";
const router = express.Router();

import {
  registerUser,
  authUser,
  logoutUser,
  getUserById,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

router.route("/").get(getUsers);
router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUser);
router.route("/:id/delete").get(getUserById).delete(deleteUser);
router.route("/:id").get(getUserById)

export default router;
