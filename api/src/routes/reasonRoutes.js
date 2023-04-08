const { Router } = require("express");
const reasonController = require("../controllers/reasonController.js");
const checkToken = require("../middleewares/checkToken.js");
const checkUser = require("../middleewares/checkUser.js");

const router = Router();

router.post("/reason/create", checkToken, checkUser, reasonController.create);
router.get("/reason/getall", checkToken, checkUser, reasonController.getAll);

module.exports = router;
