import { Router } from "express";
const router = Router();
import AdminRoutes from "./admin/index.js";
import userRoutes from "./user/index.js";
import aggRoutes from "./user/agg.js"
// import queryRoutes from "./queryRoutes/queryRoutes.js";
import upload from "../middleware/upload.middleware.js";
import allpracticeQuery from "./queryRoutes/allpracticeQuery.routes.js"

router.use("/admin", AdminRoutes);
router.use("/user", userRoutes);
router.use("/agg", aggRoutes);
router.use("/all-prcatice-query", allpracticeQuery)


export default router;