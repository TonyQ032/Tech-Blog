const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll()

    res.json(commentData)
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;