const router = require('express').Router();

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {
    res.render("homepage");
    //res.json({"Message": "Success!"})
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    res.render("dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
