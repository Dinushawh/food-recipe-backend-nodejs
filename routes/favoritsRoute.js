const favoritsController = require("../controllers/favoritsController");
const isAuth = require("../middleware/isAuth");

const router = require("express").Router();

router.get("/get-favorits", isAuth, favoritsController.getfavorits);

router.post("/add-favorits", isAuth, favoritsController.addFavorits);

router.post("/delete-favorits", isAuth, favoritsController.deleteFavorits);

module.exports = router;
