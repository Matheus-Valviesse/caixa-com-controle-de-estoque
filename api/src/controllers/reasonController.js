const Reason = require("../models/Reason.js");
const { Op, Model } = require("sequelize");
const validate = require("../functions/validate.js");
const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const ReasonController = {
  create: async (req, res) => {
    const { reason } = req.body;

    try {
      const findReasonName = await Reason.findOne({
        where: { reason: reason },
      });
      if (findReasonName) throw new Error("Motivo já se encontra cadastrado.");

      const createReason = await Reason.create({
        reason: reason,
      });

      return res
        .status(200)
        .json(`O movito: ${createReason.reason}, foi criado com sucesso.`);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const findReasonName = await Reason.findAll();

      return res.status(200).json({ findReasonName });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },
};

module.exports = ReasonController;
