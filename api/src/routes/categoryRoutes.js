const { Router } = require("express");
const categoryController = require("../controllers/categoryController.js");
const checkToken = require("../middleewares/checkToken.js");

const router = Router();

router.post("/category/create", checkToken, categoryController.create);
router.get("/category/getall", checkToken, categoryController.getAll);
router.put("/category/update", checkToken, categoryController.update);
router.delete("/category/delete", checkToken, categoryController.delete);

module.exports = router;
