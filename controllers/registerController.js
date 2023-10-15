const userModel = require("../models/userModel");
const crypto = require("crypto");

const registerController = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, credentials, phonenumber } = req.body;
      if (!firstname || !lastname || !email || !credentials || !phonenumber) {
        return res.status(400).json({
          status: "error",
          message: "All fields are required",
        });
      } else {
        const isEmailExist = await userModel.findOne({ email: email });
        if (isEmailExist) {
          return res.status(400).json({
            status: "error",
            message: "Email already exists",
          });
        } else {
          const salt = crypto.randomBytes(16).toString("hex");
          const hashedPassword = crypto
            .pbkdf2Sync(credentials, salt, 1000, 64, "sha512")
            .toString("hex");

          const newUser = new userModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            phonenumber: phonenumber,
            salt: salt,
          });
          await newUser.save();
          return res.status(200).json({
            status: "success",
            message: "User created",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};

module.exports = registerController;
