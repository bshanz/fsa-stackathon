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

// Route to update the current user
router.put("/user", isLoggedIn, async (req, res, next) => {
  try {
    const { id, username, firstName, lastName, email, password } = req.body;
    const user = await User.findByPk(id);
    if (user) {
      const updatedUser = await user.update({
        username,
        firstName,
        lastName,
        email,
        password,
      });
      res.json(updatedUser);
    } else {
      throw "user not found";
    }
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
