const express = require("express");
const router = express.Router();
const zod = require("zod");
const User = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signupSchema = zod.object({
  username: zod.string().min(3).max(30),
  password: zod.string().min(6),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(400).json({
      error: result.error.format(),
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.status(400).json({
      error: "User already exists",
    });
  }

  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully!",
    token: token,
  });
});

module.exports = router;
