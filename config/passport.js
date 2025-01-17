const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

// Configure local authentication strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const dbUser = await db.User.findOne({where: {email}});

        // Handle user not found
        if (!dbUser) {
          console.error(`Login failed: No user found with email ${email}`);
          return done(null, false, {message: "Email address is not registered"});
        }

        // Handle invalid password
        if (!dbUser.validPassword(password)) {
          console.error(`Login failed: Incorrect password for email ${email}`);
          return done(null, false, {message: "Incorrect password"});
        }
        
        // Handle successful login
        console.info(`User ${dbUser.email} logged in successfully`);
        return done(null, dbUser);

      } catch (error) {
        // Handle database errors
        console.error("Login error:", error);
        return done(error, false);
      }
    }
  )
);

// Serialize user for session storage
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return cb(new Error("User not found"), null);
    }

    user.role = user.role.trim();
    console.log("Deserialized user:", user);
    cb(null, user);
  } catch (error) {
    console.error("Deserialization error:", error);
    cb(error, null);
  }
});

module.exports = passport;