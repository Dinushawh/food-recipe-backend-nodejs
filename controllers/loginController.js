const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const accessToken = require("../utils/accessTokens");

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
        const isUserExsist = await user.findOne({ email: email });
        if (!isUserExsist) {
          return res.status(400).json({
            status: "error",
            message: "User not found",
          });
        }
        const comparePassword = await bcrypt.compare(
          password,
          isUserExsist.password
        );
        if (!comparePassword) {
          return res.status(400).json({
            status: "error",
            message: "Password not match",
          });
        }
        const payload = {
          id: isUserExsist._id,
          email: isUserExsist.email,
          firstname: isUserExsist.firstname,
          lastname: isUserExsist.lastname,
          phone: isUserExsist.phonenumber,
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
