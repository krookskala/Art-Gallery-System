const db = require("../models");

module.exports = function(app) {
  // GET All Styles
  app.get("/api/style/all", async (req, res) => {
    try {
      const styles = await db.Style.findAll({});
      res.json(styles);
    } catch (error) {
      console.error("Error Fetching All Styles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // GET A Specific Style
  app.get("/api/style/:style_name", async (req, res) => {
    try {
      const style = await db.Style.findOne({
        where: { style_name: req.params.style_name }
      });
      if (style) {
        res.json(style);
      } else {
        res.status(404).json({ error: "Style Not Found" });
      }
    } catch (error) {
      console.error(`Error Fetching Style ${req.params.style_name}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // ADD A Style
  app.post("/api/style", async (req, res) => {
    try {
      console.log("Received data:", req.body);
      const { style_name, style_description } = req.body;
      if (!style_name) {
        return res.status(400).json({ message: "Style Name is required." });
      }
      const newStyle = await db.Style.create({ style_name, style_description });
      res.status(201).json(newStyle);
    } catch (error) {
      console.error("Error Adding Style:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};