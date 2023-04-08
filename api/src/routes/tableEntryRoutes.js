const { Router } = require("express");
const TableEntry = require("../controllers/tableEntryController.js");

const router = Router();

router.get("/tableentry/getall", TableEntry.getAll);

module.exports = router;
