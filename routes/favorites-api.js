const express = require("express");
const router = express.Router();
const { UserFavorites, Style } = require("../models");
const isAuthenticated = require("../config/middleware/isauthenticated");

// Add to Favorites
router.post("/api/favorites", isAuthenticated("user"), async (req, res) => {
    try {
        const { style_name } = req.body;
        const userId = req.user.id;

        // Check if style exists
        const style = await Style.findOne({
            where: { style_name: style_name }
        });

        if (!style) {
            return res.status(404).json({ message: "Style not found" });
        }

        // Check if already favorited
        const existingFavorite = await UserFavorites.findOne({
            where: {
                user_id: userId,
                style_name: style_name
            }
        });

        if (existingFavorite) {
            // Remove from favorites
            await existingFavorite.destroy();
            return res.status(200).json({
                success: true,
                message: "Removed from favorites",
                action: "removed"
            });
        }

        // Add new favorite
        await UserFavorites.create({
            user_id: userId,
            style_name: style_name
        });

        res.status(201).json({
            success: true,
            message: "Added to favorites",
            action: "added"
        });
    } catch (error) {
        console.error("Error processing favorite:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// Get Favorites
router.get("/api/favorites", isAuthenticated("user"), async (req, res) => {
    try {
        const favorites = await UserFavorites.findAll({
            where: { user_id: req.user.id },
            include: [{
                model: Style,
                attributes: ['style_name', 'style_description']
            }]
        });

        res.json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// Check Favorite Status
router.get("/api/favorites/check/:styleName", isAuthenticated("user"), async (req, res) => {
    try {
        const { styleName } = req.params;
        const userId = req.user.id;

        const favorite = await UserFavorites.findOne({
            where: {
                user_id: userId,
                style_name: styleName
            }
        });

        res.json({ isFavorite: !!favorite });
    } catch (error) {
        console.error("Error checking favorite status:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;
