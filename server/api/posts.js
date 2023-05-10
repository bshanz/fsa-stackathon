const express = require("express");
const router = express.Router();
const { Post } = require("../db");
const { isLoggedIn } = require("./middleware");

// Route to get all posts
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.send(posts);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
