import express from "express";

import {
  register,
  login,
  logout,
  me,
  getUsers,
  getMe,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.post(
  "/logout",
  logout
);


router.get(
  "/me",
  authMiddleware,
  getMe
);

router.get(
  "/getUsers",
  authMiddleware,
  getUsers
);


export default router;