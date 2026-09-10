import express from "express";
import { getAlluser } from "../../controllers/user/aggControllers.js";
const router = express.Router();

router.get("/", getAlluser)

export default router;
