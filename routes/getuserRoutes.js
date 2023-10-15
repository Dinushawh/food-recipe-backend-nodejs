const getUserController = require("../controllers/getuserController");
const isAuth = require("../middleware/isAuth");

const router = require("express").Router();

router.get("/get-user", isAuth, getUserController.getUserByToken);

module.exports = router;
