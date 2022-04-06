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
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        status: false,
        msg: "Incorrect username or password!",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        status: false,
        msg: "Incorrect username or password!",
      });
    }
    delete user.password;
    res.json({ status: true, user });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const avatarImage = req.body.image;
    return User.updateOne(
      { _id: userId },
      { $set: { isAvatarImageSet: true, avatarImage } }
    )
      .then((result) => {
        if (result.modifiedCount > 0) {
          return res.json({
            isSet: true,
            image: avatarImage,
          });
        }
        return res.json({
          status: false,
          msg: "Set Avatar error, please try again!",
        });
      })
      .catch((err) => console.log(`crror: ${err}`));
    
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllusers = async (req, res, next) => {
  try {
    // 排除当前用户的 id
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
