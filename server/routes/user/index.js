import express from "express";
import { getAlluser } from "../../controllers/user/user.controller.js";
const router = express.Router();

// Find all users.
router.post("/", getAlluser)


// Find user by email.
// Find user by _id.
// Find active users only.
// Find inactive users.
// Find users whose name starts with "S".
// Find users whose email contains "gmail".
// Find users created today.

export default router;
