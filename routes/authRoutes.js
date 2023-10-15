const router = require("express").Router();
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");

router.post("/login", loginController.login);
router.post("/register", registerController.register);

module.exports = router;
