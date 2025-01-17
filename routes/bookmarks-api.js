const express = require("express");
const router = express.Router();
const { UserBookmarks, Exhibit } = require("../models");
const isAuthenticated = require("../config/middleware/isauthenticated");

// Add a bookmark
router.post("/api/bookmarks", isAuthenticated("user"), async (req, res) => {
    try {
        const { exhibition_id } = req.body;
        const userId = req.user.id;

        // Check if already bookmarked
        const existingBookmark = await UserBookmarks.findOne({
            where: { user_id: userId, exhibition_id }
        });

        if (existingBookmark) {
            return res.status(400).json({ message: "This exhibition is already bookmarked" });
        }

        await UserBookmarks.create({
            user_id: userId,
            exhibition_id
        });

        res.status(201).json({ message: "Exhibition bookmarked successfully" });
    } catch (error) {
        console.error("Error adding bookmark:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// Remove a bookmark
router.delete("/api/bookmarks/:exhibitionId", isAuthenticated("user"), async (req, res) => {
    try {
        const result = await UserBookmarks.destroy({
            where: {
                exhibition_id: req.params.exhibitionId,
                user_id: req.user.id
            }
        });

        if (result === 0) {
            return res.status(404).json({ message: "Bookmark not found" });
        }

        res.status(200).json({ message: "Bookmark deleted successfully" });
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// Get user's bookmarks
router.get("/api/bookmarks", isAuthenticated("user"), async (req, res) => {
    try {
        const bookmarks = await UserBookmarks.findAll({
            where: { user_id: req.user.id },
            include: [{
                model: Exhibit,
                attributes: ['exhibit_name', 'date', 'time', 'exhibit_descript']
            }],
            order: [['createdAt', 'DESC']]
        });

        res.json(bookmarks);
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// Check bookmark status
router.get("/api/bookmarks/check/:exhibitionId", isAuthenticated("user"), async (req, res) => {
    try {
        const { exhibitionId } = req.params;
        const userId = req.user.id;

        const bookmark = await UserBookmarks.findOne({
            where: {
                user_id: userId,
                exhibition_id: exhibitionId
            }
        });

        res.json({
            isBookmarked: !!bookmark,
            bookmarkId: bookmark ? bookmark.id : null
        });
    } catch (error) {
        console.error("Error checking bookmark status:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;
