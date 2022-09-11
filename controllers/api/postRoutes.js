const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const auth = require("../../utils/auth");

// All requests are made to /api/posts/...

// Get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"]
        }
      ]
    });

    res.json(postData)
  } catch (err) {
    res.status(500).json(err);
  }
})

// Get Post by ID
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ["name"]
        },
        {
          model: Comment,
          attributes: ["id", "description", "date_created"],
        }
      ]
    })

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" })
    }
    res.json(postData)

  } catch {
    res.status(500).json(err);
  }

})

// Create new post
router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id
    })

    res.json(postData)
  } catch (err) {
    res.status(500).json(err);
  }
})

// Updates a post
router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.update(
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

    res.json({ "Message": "Post updated successfully!"})
  } catch (err) {
    res.status(500).json(err)
  }
})

// Deletes a post with an id
router.delete("/:id", auth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!postData) {
      res.status(404).json({message: "No post found that matches ID provided."})
    };

    res.json({message: "Successfully deleted post!"});
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;