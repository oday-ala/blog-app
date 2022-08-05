const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
router.post("/register", async (req, res) => {
  try {
    const OldUser = await User.findOne({ username: req.body.username });
    const OldUser2 = await User.findOne({ email: req.body.email });
    if (OldUser) {
      return res
        .status(401)
        .json("Username is already exist, please change it!");
    }
    if (OldUser2) {
      return res.status(401).json("Email is already exist, please change it!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });

    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("Username or password not correct!");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Username or password not correct!");
    }

    const { password, ...others } = user._doc;

    return res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
