const db = require("../models");

module.exports = function (app) {
  // Add a new exhibit
  app.post("/api/exhibit", async (req, res) => {
    try {
      const { name, description, startDate, endDate } = req.body;

      if (!name || !description || !startDate || !endDate) {
        return res.status(400).json({ error: "All fields are required: name, description, startDate, endDate" });
      }

      const newExhibit = await db.Exhibit.create(req.body);
      res.status(201).json(newExhibit);
    } catch (error) {
      console.error("Error adding exhibit:", error.message, error.stack);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all exhibitions with pagination
  app.get("/api/exhibitions", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const offset = (page - 1) * size;

      const { count, rows } = await db.Exhibit.findAndCountAll({
        limit: size,
        offset: offset,
        order: [['date', 'ASC']]
      });

      res.json({
        data: rows,
        totalItems: count,
        totalPages: Math.ceil(count / size),
        currentPage: page
      });
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};