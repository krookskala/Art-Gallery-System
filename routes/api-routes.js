const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    let redirectUrl;
    switch(req.user.role.toLowerCase()) {
      case 'admin':
        redirectUrl = '/manager/dashboard';
        break;
      case 'user':
        redirectUrl = '/user/dashboard';
        break;
      default:
        redirectUrl = '/';
        break;
    }
    res.json({
      email: req.user.email,
      role: req.user.role,
      redirectUrl: redirectUrl
    });
  });

  app.post("/api/signup", async (req, res) => {
    try {
      console.log("Signup attempt:", req.body);
      const user = await db.User.create({
        email: req.body.email,
        password: req.body.password,
        role: "user"
      });
      res.json({
        message: "Signup successful! Please login to continue.",
        status: "success"
      });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(401).json({
        message: err.errors?.[0]?.message || "Error during signup"
      });
    }
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/logout", (req, res) => {
    req.logout(function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Logout failed"
        });
      }
      res.json({
        success: true,
        message: "Successfully logged out"
      });
    });
  });

  app.put("/api/user/email", (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    const newEmail = req.body.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    if (newEmail === req.user.email) {
      return res.status(400).json({ message: "New email cannot be the same as current email" });
    }

    db.User.findOne({ where: { email: newEmail } })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ message: "This email is already in use" });
        }
        return db.User.update(
          { email: newEmail },
          { where: { id: req.user.id } }
        );
      })
      .then(() => {
        res.json({
          success: true,
          message: "Email successfully updated"
        });
      })
      .catch(err => {
        res.status(400).json({
          message: "Failed to update email"
        });
      });
  });

  app.put("/api/user/password", (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password cannot be the same as current password"
      });
    }

    db.User.findByPk(req.user.id)
      .then(user => {
        if (!user.validPassword(currentPassword)) {
          return res.status(401).json({
            message: "Current password is incorrect"
          });
        }
        user.password = newPassword;
        return user.save();
      })
      .then(() => {
        res.json({
          success: true,
          message: "Password successfully updated"
        });
      })
      .catch(err => {
        res.status(400).json({
          message: "Failed to update password"
        });
      });
  });
};