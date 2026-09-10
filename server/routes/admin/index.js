import { Router } from "express";
const router = Router();

// GET /admin/dashboard
router.get("/dashboard", (req, res) => {
    res.json({ message: "Admin Dashboard" });
});

// GET /admin/users
router.get("/users", (req, res) => {
    res.json({ message: "All users for admin" });
});

export default router;