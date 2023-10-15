const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerController = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, credentials, phonenumber } = req.body;
      if (!firstname || !lastname || !email || !credentials || !phonenumber) {
        return res.status(400).json({
          status: "error",
          message: "all fields are required",
        });
      } else {
        const isEmailExisit = await userModel.findOne({ email: email });
        if (isEmailExisit) {
          return res.status(400).json({
            status: "error",
            message: "email already exsist",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(credentials, salt);
          const newUser = new userModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            phonenumber: phonenumber,
          });
          await newUser.save();
          return res.status(200).json({
            status: "success",
            message: "user created",
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
