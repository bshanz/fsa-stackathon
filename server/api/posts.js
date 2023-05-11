const express = require("express");
const router = express.Router();
const { Post, User } = require("../db");
const { isLoggedIn } = require("./middleware");

// Route to get all posts
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: User, // Join User model
    });
    res.send(posts);
  } catch (ex) {
    next(ex);
  }
});

// Route to create a new post
router.post("/createpost", isLoggedIn, async (req, res, next) => {
  try {
    const { userId, url, description } = req.body;
    const user = await User.findByPk(userId); // Find the user by ID
    const newPost = await Post.create({
      userId,
      url,
      description,
      userName: user.firstName,
    }); // Include the user's first name
    res.status(201).send(newPost);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
