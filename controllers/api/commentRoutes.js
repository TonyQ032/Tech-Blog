const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const auth = require("../../utils/auth");

// All requests are made to /api/comments/...

// Gets all comments made
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Get Comment by ID
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: {
        id: req.params.id
      }
    })

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" })
    }
    
    res.json(commentData)

  } catch {
    res.status(500).json(err);
  }

})

// Creates a new comment
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      user_id: req.body.user_id,
      post_id: req.body.post_id,
      description: req.body.description
    });

    res.json({message: "Comment posted successfully!", comment: commentData});
  } catch (err) {
    res.status(500).json(err);
  }
})

// Updates a comment by ID
router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        description: req.body.description
      },
      {
        where: {
          id: req.params.id
        }
      }
    )

    res.json({ "Message": "Comment updated successfully!"})
  } catch (err) {
    res.status(500).json(err)
  }
})

// Deletes a comment with an id
router.delete("/:id", auth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!commentData) {
      res.status(404).json({message: "No comment found that matches ID provided."})
    };

    res.json({message: "Successfully deleted comment!"});
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;