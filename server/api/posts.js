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

// Route to create a new post
router.post("/createpost", isLoggedIn, async (req, res, next) => {
  try {
    const { url, description } = req.body;
    const newPost = await Post.create({ url, description });
    res.status(201).send(newPost);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
