const express = require("express");
const router = express.Router();
const { Activity } = require("../models");
const isAuthenticated = require("../config/middleware/isauthenticated");

// Get activity feed for the logged-in user
router.get("/activity", isAuthenticated("user"), async (req, res) => {
    try {
        const userId = req.user.id;
        const activities = await Activity.findAll({
            where: { users_id: userId },
            order: [["timestamp", "DESC"]]
        });
        res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
