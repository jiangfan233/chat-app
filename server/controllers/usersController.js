const bcrypt = require("bcrypt");
const User = require("../model/userModel");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameChect = await User.findOne({ username });
    if (usernameChect)
      return res.json({ msg: "Username already used.", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used.", status: false });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashPassword,
    });
    // 明文密码已经不需要了
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const target = await User.findOne({ username });
    if (!target) {
      return res.json({ status: false, msg: "The username do not exist!" });
    }
    const passwordCheck = await bcrypt.compare(password, target.password);
    if (!passwordCheck) {
      return res.json({ status: false, msg: "The password do not correct!" });
    }
    res.json({ status: true, msg: "" });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};
