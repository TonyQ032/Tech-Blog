// Authentication
// If the user isn't logged in, redirects them to sign in page
const auth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = auth;