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
    const avatarImage = req.body.image;
    // const userData = User.findByIdAndUpdate(userId, {
    //   isAvatarImageSet: true,
    //   avatarImage,
    // },
    // (err, docs) => err ? console.log(err) : console.log(docs)
    // );
    const UserValid = await User.findOne({ userId });
    if (UserValid) {
      UserValid.updateOne(
        { isAvatarImageSet: true, avatarImage },
        (err, docs) => {
          if (err) {
            return res.json({
              status: false,
              msg: "Set Avatar error, please try again!",
            });
          } else {
            return res.json({
              isSet: UserValid.isAvatarImageSet,
              image: UserValid.avatarImage,
            });
          }
        }
      );
    } else {
      res.json({ status: false, msg: "Set Avatar error, please try again!" });
    }
  } catch (ex) {
    next(ex);
  }
};
