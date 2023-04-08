const TableEntry = require("../models/TableEntry.js");
const emailConfirmationTemplate = require("../functions/templateUserConfirmationEmail.js");
const emailRecoverPasswordTemplate = require("../functions/templateUserRecoverPassword.js");
const randomPasswordGenerate = require("../functions/ramdomPasswordGenerate.js");
const { Op, Model } = require("sequelize");
const validate = require("../functions/validate.js");
const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv");
const defineValue = require("../functions/defineValue.js");

dotenv.config();

const TableEntryController = {
  getAll: async (req, res) => {
    try {
      const findTableEntry = await TableEntry.findAll();

      return res.status(200).json({ findTableEntry });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },
};

module.exports = TableEntryController;
