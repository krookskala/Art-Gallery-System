require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const { engine } = require("express-handlebars");
const db = require("./models");
const path = require("path");
const isauthenticated = require("./config/middleware/isauthenticated");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Session And Passport
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    },
    helpers: {
      eq: function(a, b) { return a === b; },
      ifCond: function(v1, operator, v2, options) {
        switch (operator) {
          case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
          case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
          case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
          case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
          case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
          case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
          case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
          case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
          default:
            return options.inverse(this);
        }
      }
    }
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const favoritesRouter = require("./routes/favorites-api");
app.use(favoritesRouter);

const bookmarksRouter = require("./routes/bookmarks-api");
app.use(bookmarksRouter);

// Routes
require("./routes/api-routes.js")(app);
require("./routes/artist-api")(app);
require("./routes/artwork-api")(app);
require("./routes/exhibit-api")(app);
require("./routes/style-api")(app);
require("./routes/html-routes")(app);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Went Wrong!");
});

// Database Connection Test
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Database Sync And Server Initialization
db.sequelize
  .sync()
  .then(() => {
    console.log("Database Connected.");
    app.listen(PORT, () => console.log(`App Running On http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Error Connecting To The Database:", err));