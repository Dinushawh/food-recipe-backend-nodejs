const user = require("../models/userModel");
const accessToken = require("../utils/accessTokens");
const crypto = require("crypto");

const loginController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Please provide email and password",
        });
      } else {
        const isUserExist = await user.findOne({ email: email });
        if (!isUserExist) {
          return res.status(400).json({
            status: "error",
            message: "User not found",
          });
        }
        const salt = isUserExist.salt;
        const hashedPassword = crypto
          .pbkdf2Sync(password, salt, 1000, 64, "sha512")
          .toString("hex");

        const storedPassword = isUserExist.password;

        if (hashedPassword !== storedPassword) {
          return res.status(400).json({
            status: "error",
            message: "Password not match",
          });
        }

        const payload = {
          id: isUserExist._id,
          email: isUserExist.email,
          firstname: isUserExist.firstname,
          lastname: isUserExist.lastname,
          phone: isUserExist.phonenumber,
        };
        const token = accessToken.generateAccessToken(payload);

        return res.status(200).json({
          status: "success",
          message: "Login success",
          token: token,
          payload: payload,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};

module.exports = loginController;
