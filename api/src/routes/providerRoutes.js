const { Router } = require("express");
const providerController = require("../controllers/providerController.js");
const checkToken = require("../middleewares/checkToken.js");

const router = Router();

router.post("/provider/create", checkToken, providerController.create);
router.get("/provider/getall", checkToken, providerController.getAll);
router.put("/provider/update", checkToken, providerController.update);
router.delete("/provider/delete", checkToken, providerController.delete);

module.exports = router;
