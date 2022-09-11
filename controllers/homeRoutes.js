const router = require("express").Router();
const auth = require("../utils/auth"); 

// Home page
router.get("/", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render("homepage", {
        logged_in: req.session.logged_in
      })
    } else {
      res.render("homepage");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login page
router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Signup page
router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

// User dashboard
router.get("/dashboard", auth, async (req, res) => {
  try {
    res.render("dashboard",{
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
