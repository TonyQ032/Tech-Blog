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

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }

  // res.render('login');
});

module.exports = router;
