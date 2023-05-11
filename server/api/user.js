const express = require("express");
const router = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware");

// Route to get the current user
router.get("/user", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (ex) {
    next(ex);
  }
});
