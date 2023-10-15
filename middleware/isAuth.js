const accessToken = require("../utils/accessTokens");
const extractedToken = require("../utils/extractToken");
const user = require("../models/userModel");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "token-not-found-unauthorized",
      });
    } else {
      const tokenExtracted = extractedToken(token);

      const verifyToken = accessToken.verifyAccessToken(
        tokenExtracted.data.token
      );

      if (verifyToken) {
        const exsistinguser = await user.findById({ _id: verifyToken.id });
        if (!exsistinguser) {
          return res.status(401).json({
            status: 401,
            message: "unauthorized",
          });
        } else {
          const currentTime = new Date().getTime();
          const tokenExpiredTime = verifyToken.exp * 1000;

          if (currentTime > tokenExpiredTime) {
            return res.status(401).json({
              status: 401,
              message: "token-expired",
            });
          } else {
            req.user = exsistinguser;
            next();
          }
        }
      } else {
        return res.status(401).json({
          status: 401,
          message: "unauthorized",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "auth Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = isAuth;
