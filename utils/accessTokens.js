const jwt = require("jsonwebtoken");
const fs = require("fs");

const accessTokens = {
  generateAccessToken: (payload) => {
    const privateKey = fs.readFileSync("./certs/private.pem", "utf8");
    const accessToken = jwt.sign(payload, privateKey, {
      expiresIn: "1d",
      algorithm: "RS256",
    });
    return accessToken;
  },
  generateRefreshToken: (payload) => {
    const privateKey = fs.readFileSync("./certs/private.pem", "utf8");
    const refreshToken = jwt.sign(payload, privateKey, {
      expiresIn: "7d",
      algorithm: "RS256",
    });
    return refreshToken;
  },

  verifyRefreshToken: (refreshToken) => {
    const publicKey = fs.readFileSync("./certs/public.pem", "utf8");
    const verifyToken = jwt.verify(refreshToken, publicKey);
    return verifyToken;
  },

  verifyAccessToken: (accessToken) => {
    const publicKey = fs.readFileSync("./certs/public.pem", "utf8");
    const verifyToken = jwt.verify(accessToken, publicKey);
    return verifyToken;
  },
};

module.exports = accessTokens;
