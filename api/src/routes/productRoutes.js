const { Router } = require("express");
const productController = require("../controllers/productController.js");
const checkToken = require("../middleewares/checkToken.js");
const checkUser = require("../middleewares/checkUser.js");

const router = Router();

router.post("/product/create", checkToken, checkUser, productController.create);
router.get("/product/getall", checkToken, checkUser, productController.getAll);
// router.put("/product/update", checkToken, productController.update);
// router.delete("/product/delete", checkToken, productController.delete);

module.exports = router;
