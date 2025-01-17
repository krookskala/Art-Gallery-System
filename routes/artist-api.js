const db = require("../models");

module.exports = function (app) {
  // GET All Artists
  app.get("/api/artist/all", async (req, res) => {
    try {
      const artists = await db.Artist.findAll({});
      res.json(artists);
    } catch (error) {
      console.error("Error Fetching All Artists:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET A Specific Artist By Name
  app.get("/api/artist/byName/:artist", async (req, res) => {
    try {
      const artist = await db.Artist.findOne({
        where: { artist_name: req.params.artist }
      });
      if (!artist) {
        return res.status(404).json({ message: "Artist Not Found" });
      }
      res.json(artist);
    } catch (error) {
      console.error("Error Fetching Artist By Name:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET All Artists By Artwork
  app.get("/api/artist/byArtwork/:artwork", async (req, res) => {
    try {
      const artists = await db.Artist.findAll({
        include: [{
          model: db.Artwork,
          where: { artwork_name: req.params.artwork }
        }]
      });
      res.json(artists);
    } catch (error) {
      console.error("Error Fetching Artists By Artwork:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET All Artists By Style
  app.get("/api/artist/byStyle/:style", async (req, res) => {
    try {
      const artists = await db.Artist.findAll({
        where: { style: req.params.style },
        include: [db.Style]
      });
      res.json(artists);
    } catch (error) {
      console.error("Error Fetching Artists By Style:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // ADD A New Artist
  app.post("/api/artist", async (req, res) => {
    try {
      const newArtist = await db.Artist.create(req.body);
      res.status(201).json(newArtist);
    } catch (error) {
      console.error("Error Creating Artist:", error);
      res.status(400).json({ message: "Error Creating Artist" });
    }
  });

  // DELETE An Artist
  app.delete("/api/artist/:id", async (req, res) => {
    try {
      const result = await db.Artist.destroy({
        where: { id: req.params.id }
      });
      if (result === 0) {
        return res.status(404).json({ message: "Artist Not Found" });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error Deleting Artist:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};