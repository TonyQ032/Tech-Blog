const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");

// All requests are made to /api/posts/...

// Get all posts
router.get("/", (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["name"]
      }
    ]
  })
  .then(postData => res.json(postData))
  .catch(err => {
    res.status(500).json(err);
  })
})

// Get Post by ID
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ["name"]
      }
    ]
  })
  .then(postData => {
    if(!postData) {
      res.status(404).json({ message: "No post found with this id!"})
    }
    res.json(postData)
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

// Create new post
router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    description: req.body.description,
    user_id: req.body.user_id
  })
  .then(postData => res.json(postData))
  .catch(err => {
    res.status(500).json(err);
  })
})

router.put("/:id", (req, res) => {
  Post.update(
    {
      title: req.body.title,
      description: req.body.description
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(postData => res.json({"Message": "Post updated successfully!", "Post": postData}))
  .catch(err => {
    res.status(500).json(err);
  })
})

module.exports = router;