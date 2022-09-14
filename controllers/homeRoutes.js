const router = require("express").Router();
const auth = require("../utils/auth");
const { User, Post, Comment } = require("../models");
const sequelize = require ("../config/connection");

// Home page
router.get("/", async (req, res) => {
  try {

    // Retrieve all posts from database
    const postData = await Post.findAll({
      attributes: ["id", "description", "date_created", "title"],
      order: sequelize.literal('id DESC'),
      include: [
        {
          model: Comment,
          attributes: ["id", "description", "post_id", "user_id", "date_created"],
          include: {
            model: User,
            attributes: ["name"]
          }
        },
        {
          model: User,
          attributes: ["name"]
        }
      ]
    });

    const posts = postData.map(post => post.get({ plain: true }));

    if (req.session.logged_in) {
      res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
      })
    } else {
      res.render("homepage", {
        posts
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {

    // Retrieve all posts from database
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "description", "date_created", "title"],
      include: [
        {
          model: User,
          attributes: ["name"]
        },
        {
          model: Comment,
          attributes: ["id", "description", "post_id", "user_id", "date_created"],
          include: {
            model: User,
            attributes: ["name"]
          }
        }
      ]
    });

    const post = postData.get({ plain: true });

    if (req.session.logged_in) {
      res.render("onepost", {
        post,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
      })
    } else {
      res.redirect("/login");
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
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
