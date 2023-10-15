const mongoose = require("mongoose");

const connect = async () => {
  const BaseUrl = process.env.MONGODB_URI;
  await mongoose
    .connect(BaseUrl, {
      useNewUrlParser: true,
    })
    .then(function () {
      console.log("Successfully connected to the database");
    })
    .catch(function (err) {
      console.log("Unable to connect to the database: " + err);
    });
};

module.exports = connect;
