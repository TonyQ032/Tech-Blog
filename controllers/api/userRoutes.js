// Temporary code
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// All requests are made to /api/users/...

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({ attributes: { exclude: ["password"] } });

    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({ 
      attributes: {
        exclude: ["password"]
      },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "description", "date_created"]
        },
        {
          model: Comment,
          attributes: ["id", "post_id", "description", "date_created"],
          include: {
            model: Post,
            attributes: ["title"]
          }
        }
      ]
    });

    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post("/login", async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Used to create new users
router.post("/create", async (req, res) => {
  try {
    User.create(req.body)

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json({ "User": req.body, "Message": "Successfully created a new user!" });
    });

  } catch (err) {
    res.status(500).json(err);
  }
})

router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
