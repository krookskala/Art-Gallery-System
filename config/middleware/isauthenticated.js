module.exports = function(requiredRole) {
  return function(req, res, next) {
    // Check if user is logged in
    if (!req.user) {
      // Redirect unauthorized user to homepage
      return res.redirect("/");
    }

    // If role is specified, check user's role
    if (requiredRole) {
      if (req.user.role !== requiredRole) {
        // Redirect user with wrong role to their dashboard
        if (req.user.role === "admin") {
          return res.redirect("/manager/dashboard");
        } else {
          return res.redirect("/user/dashboard");
        }
      }
    }

    // All checks passed, continue
    next();
  };
};