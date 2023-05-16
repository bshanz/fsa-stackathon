const express = require("express");
const router = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware");

router.get("/user", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (ex) {
    next(ex);
  }
});

router.put("/user", isLoggedIn, async (req, res, next) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;
    const user = await User.findByPk(req.user.id);
    if (user) {
      const updatedUser = await user.update(
        {
          username,
          firstName,
          lastName,
          email,
          password,
        },
        {
          where: { id: req.user.id },
          returning: true,
          plain: true,
        }
      );
      res.json(updatedUser[1]); // Send back updated user data
    } else {
      throw "user not found";
    }
  } catch (ex) {
    next(ex);
  }
});
