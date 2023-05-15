const express = require("express");
const router = express.Router();
const { User } = require("../db");

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
