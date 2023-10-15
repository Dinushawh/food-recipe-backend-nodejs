const user = require("../models/userModel");
const extratToken = require("../utils/extractToken");

const getUserController = {
  getUserByToken: async (req, res) => {
    try {
      const user = req.user;
      const authToken = req.headers.authorization;
      const token = extratToken(authToken);

      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "user is required",
        });
      } else {
        return res.status(200).json({
          id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phonenumber,
          accessToken: token.data.token,
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

module.exports = getUserController;
