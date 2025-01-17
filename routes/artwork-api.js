const db = require("../models");

module.exports = function (app) {
  // GET All Artworks with Pagination
  app.get("/api/artwork/all", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const offset = (page - 1) * size;

      const { count, rows } = await db.Artwork.findAndCountAll({
        limit: size,
        offset: offset,
        order: [['createdAt', 'DESC']]
      });

      res.json({
        data: rows,
        totalItems: count,
        totalPages: Math.ceil(count / size),
        currentPage: page
      });
    } catch (error) {
      console.error("Error Fetching Artworks:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET One Artwork By Name
  app.get("/api/artwork/byName/:artwork", async (req, res) => {
    try {
      const artwork = await db.Artwork.findOne({
        where: { artwork_name: req.params.artwork }
      });
      if (!artwork) {
        return res.status(404).json({ message: "Artwork Not Found" });
      }
      res.json(artwork);
    } catch (error) {
      console.error("Error Fetching Artwork By Name:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET All Artworks By Style
  app.get("/api/artwork/byStyle/:style", async (req, res) => {
    try {
      const artworks = await db.Artwork.findAll({
        where: { style_name: req.params.style },
        include: [db.Style]
      });
      res.json(artworks);
    } catch (error) {
      console.error("Error Fetching Artworks By Style:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET All Artworks By Artist
  app.get("/api/artwork/byArtist/:artist", async (req, res) => {
    try {
      const artworks = await db.Artwork.findAll({
        where: { artist_name: req.params.artist },
        include: [db.Artist]
      });
      res.json(artworks);
    } catch (error) {
      console.error("Error Fetching Artworks By Artist:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Create A New Artwork
  app.post("/api/artwork", async (req, res) => {
    try {
      const {
        artwork_name,
        style_name,
        artist_name,
        artwork_size,
        artwork_descript,
        artwork_medium,
        artwork_colortone,
        artwork_price,
        artwork_image
      } = req.body;

      if (!artwork_name || !style_name || !artist_name || !artwork_size || !artwork_medium) {
        return res.status(400).json({
          message: "Required fields: Name, Style, Artist, Size, and Medium"
        });
      }

      const newArtwork = await db.Artwork.create({
        artwork_name,
        style_name,
        artist_name,
        artwork_size,
        artwork_descript,
        artwork_medium,
        artwork_colortone,
        artwork_price,
        artwork_image
      });
      res.status(201).json(newArtwork);
    } catch (error) {
      console.error("Error Creating Artwork:", error);
      res.status(400).json({ message: "Error Creating Artwork", details: error });
    }
  });

  // DELETE An Artwork
  app.delete("/api/artwork/:id", async (req, res) => {
    try {
      const result = await db.Artwork.destroy({
        where: { id: req.params.id }
      });
      if (result === 0) {
        return res.status(404).json({ message: "Artwork Not Found" });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error Deleting Artwork:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Get All Artworks
  app.get("/api/artworks", async (req, res) => {
    try {
      const artworks = await db.Artwork.findAll();
      console.log("Successfully fetched artworks:", artworks);
      res.json(artworks);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      res.status(500).json({ error: error.message });
    }
  });
};