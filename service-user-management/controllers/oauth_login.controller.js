const studentModel = require("../models/student.model");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./tokenGenerator");

//user login method
const oAuthUserLogin = async (req, res) => {

  const { email } = req.body;

  try {
    let foundUser;
    // find if entered email and password belongs to a student account
    foundUser = await studentModel.findOne({ email }).exec();

    //check if there is a matching user
    if (!foundUser) {
      return res.status(401).json({ error: "user does not exist!" });
    }

    const roles = Object.values(foundUser.user_roles);

    const { username, _id, profile_picture } = foundUser;

    const access_token = generateAccessToken({ username, _id, roles });
    const refresh_token = generateRefreshToken(foundUser);

      foundUser.refresh_token = refresh_token;
      const result = await foundUser.save();

      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(202)
        .json({ access_token, username, _id, profile_picture, roles });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { oAuthUserLogin };
