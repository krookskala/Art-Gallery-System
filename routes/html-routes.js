const path = require("path");
const isAuthenticated = require("../config/middleware/isauthenticated");
const db = require("../models");

// Get navigation data
async function getNavData() {
    try {
        // Add debug log
        console.log("Fetching nav data...");
        
        const [artists, styles, events] = await Promise.all([
            db.Artist.findAll(),
            db.Style.findAll(),
            db.Event.findAll()
        ]);

        console.log("Nav data fetched:", {
            artistCount: artists.length,
            styleCount: styles.length,
            eventCount: events.length
        });

        return {
            navArtists: { Artist: artists },
            navStyles: { Style: styles },
            navEvents: { Event: events }
        };
    } catch (error) {
        console.error("getNavData Error:", error);
        throw error; // Throw error up
    }
}

// Utility error handler
const handleRouteError = (res, error, defaultData = {}) => {
    console.error("Route Error:", error);
    res.render("error", { 
        message: "An error occurred",
        ...defaultData,
        navArtists: { Artist: [] },
        navStyles: { Style: [] }
    });
};

module.exports = function (app) {
  // Utility Function To Fetch Navigation Data
  const getNavData = async () => {
    try {
      const [artists, styles] = await Promise.all([
        db.Artist.findAll({ attributes: ["artist_name"] }),
        db.Style.findAll({ attributes: ["style_name"] }),
      ]);
      return {
        navArtists: { Artist: artists },
        navStyles: { Style: styles },
      };
    } catch (error) {
      console.error("Error Fetching Navigation Data:", error);
      throw error;
    }
  };

  // Public routes
  app.get("/", async function(req, res) {
    try {
      console.log("Home page requested");
      const navData = await getNavData();
      console.log("Rendering home page with data");
      
      res.render("index", { 
        user: req.user,
        ...navData,
        // Add user information
        userInfo: req.user ? {
          email: req.user.email,
          role: req.user.role
        } : null
      });
    } catch (error) {
      console.error("Home page error:", error);
      // Show basic page in case of error
      res.render("index", { 
        user: req.user,
        navArtists: { Artist: [] },
        navStyles: { Style: [] },
        navEvents: { Event: [] }
      });
    }
  });

  // Public collection route - visible to everyone
  app.get("/collection/:style_name", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 2;
        const offset = (page - 1) * size;

        const navData = await getNavData();
        const style = await db.Style.findOne({ 
            where: { style_name: req.params.style_name },
            raw: true
        });
        
        if (!style) {
            return res.status(404).send("Style not found");
        }

        const { count, rows } = await db.Artwork.findAndCountAll({ 
            where: { style_name: req.params.style_name },
            limit: size,
            offset,
            attributes: [
                'artwork_name',
                'artwork_image',
                'artwork_descript',
                'artwork_size',
                'artwork_medium',
                'artwork_colortone',
                'artwork_price'
            ],
            raw: false
        });

        const totalPages = Math.ceil(count / size);
        const pagination = {
            pages: Array.from({ length: totalPages }, (_, i) => ({
                pageNumber: i + 1,
                isCurrentPage: i + 1 === page
            })),
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page - 1,
            nextPage: page + 1,
            startCount: offset + 1,
            endCount: Math.min(offset + size, count),
            totalItems: count,
            currentPage: page
        };

        res.render("collections", {
            collArtwork: { Artwork: rows },
            styleHeader: style,
            pagination,
            user: req.user,
            ...navData
        });
    } catch (error) {
        console.error("Error:", error);
        handleRouteError(res, error, { user: req.user });
    }
  });
  
  // Public artist route - visible to everyone
  app.get("/artist/:artistName", async (req, res) => {
    try {
        const navData = await getNavData();
        const artist = await db.Artist.findOne({ 
            where: { artist_name: req.params.artistName },
            raw: true
        });

        if (!artist) {
            return res.status(404).send("Artist not found");
        }

        const artworks = await db.Artwork.findAll({ 
            where: { artist_name: req.params.artistName },
            attributes: [
                'artwork_name',
                'artwork_image',
                'artwork_descript',
                'artwork_size',
                'artwork_medium',
                'artwork_colortone',
                'artwork_price'
            ],
            raw: false
        });

        console.log('Artist data:', artist);
        console.log('Artworks data:', artworks);

        res.render("artists", {
            artistArtwork: { Artwork: artworks },
            artistHeader: artist,
            user: req.user,
            ...navData
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
  });

  // Exhibitions
  app.get("/exhibitions", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 2;
        const offset = (page - 1) * limit;

        const navData = await getNavData();

        const { count, rows } = await db.Exhibit.findAndCountAll({
            limit,
            offset,
            order: [['date', 'ASC']]
        });

        const totalPages = Math.ceil(count / limit);
        const pagination = {
            pages: Array.from({ length: totalPages }, (_, i) => ({
                pageNumber: i + 1,
                isCurrentPage: i + 1 === page
            })),
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page - 1,
            nextPage: page + 1,
            startCount: offset + 1,
            endCount: Math.min(offset + limit, count),
            totalItems: count
        };

        res.render("exhibition", {
            exhibitData: { Exhibit: rows },
            pagination,
            user: req.user,
            ...navData
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
  });

  // About Page
  app.get("/about", async (req, res) => {
    try {
      const navData = await getNavData();
      res.render("about", navData);
    } catch (error) {
      console.error("Error Fetching About Page Data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Admin Dashboard
  app.get("/manager", isAuthenticated("admin"), async (req, res) => {
    console.log("User Accessing Admin Route:", req.user);
    try {
      const navData = await getNavData();
      res.render("cplogged", navData);
    } catch (error) {
      console.error("Error Fetching Admin Data:", error);
      res.status(500).send("Internal Server Error");
    }
  });  

  // User Dashboard
  app.get("/user", isAuthenticated("user"), async (req, res) => {
    try {
      const navData = await getNavData();
      const userFavorites = await db.UserFavorites.findAll({
        where: { user_id: req.user.id }, 
      });
  
      const dashboardData = {
        userFavorites,
        ...navData,
      };
  
      res.render("user_dashboard", dashboardData);
    } catch (error) {
      console.error("Error Fetching User Dashboard Data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // User Dashboard Route
  app.get("/user/dashboard", isAuthenticated("user"), async (req, res) => {
    try {
        const [navData, userBookmarks] = await Promise.all([
            getNavData(),
            db.UserBookmarks.findAll({
                where: { user_id: req.user.id },
                include: [{
                    model: db.Exhibit,
                    attributes: ['exhibit_name', 'date', 'time', 'exhibit_descript']
                }],
                order: [['createdAt', 'DESC']]
            })
        ]);

        res.render("user_dashboard", {
            user: req.user,
            userBookmarks: userBookmarks,
            ...navData
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        handleRouteError(res, error, { user: req.user });
    }
  });

  // Manager Dashboard
  app.get("/manager/dashboard", isAuthenticated("admin"), async (req, res) => {
    try {
      const navData = await getNavData();
      res.render("cplogged", {
        user: req.user,
        ...navData
      });
    } catch (error) {
      console.error("Manager Dashboard Error:", error);
      res.status(500).send("Error loading dashboard");
    }
  });

  // Generic Dashboard Redirect
  app.get("/dashboard", (req, res) => {
    if (!req.user) {
      return res.redirect("/login");
    }

    const role = req.user.role.trim().toLowerCase();
    if (role === "admin") {
      res.redirect("/admin/dashboard");
    } else if (role === "user") {
      res.redirect("/user/dashboard");
    } else {
      res.redirect("/login");
    }
  });

  // Test route to check database content
  app.get("/api/test/data", async (req, res) => {
    try {
      const styles = await db.Style.findAll();
      const artworks = await db.Artwork.findAll();
      const artists = await db.Artist.findAll();
      
      res.json({
        styles,
        artworks,
        artists
      });
    } catch (error) {
      console.error("Error fetching test data:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Profile page route
  app.get('/profile', isAuthenticated, (req, res) => {
    const userActivity = [];
    
    res.render('profile', {
        user: req.user,
        userActivity: userActivity
    });
  });
};