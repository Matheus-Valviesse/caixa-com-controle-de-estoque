const Provider = require("../models/Provider.js");
const User = require("../models/User.js");
const emailConfirmationTemplate = require("../functions/templateUserConfirmationEmail.js");
const emailRecoverPasswordTemplate = require("../functions/templateUserRecoverPassword.js");
const randomPasswordGenerate = require("../functions/ramdomPasswordGenerate.js");
const { Op, Model } = require("sequelize");
const validate = require("../functions/validate.js");
const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const providerController = {
  create: async (req, res) => {
    const { userId: id, name, email, address, phone } = req.body;

    try {
      validate({ name, isRequired: true });
      validate({ email, type: "email", isRequired: true });
      validate({ address, isRequired: true });
      validate({ phone, type: "telefone", isRequired: true });

      const userExist = await User.findByPk(id);

      if (!userExist) throw new Error("Usuario precisa estar logado");
      if (userExist && userExist.role != "ADM")
        throw new Error("Usuario não possui privilégio");

      const providerExistEmail = await Provider.findOne({
        where: {
          email: email,
        },
      });

      if (providerExistEmail) throw new Error("Email já cadastrado");

      const providerExistPhone = await Provider.findOne({
        where: {
          phone: phone,
        },
      });
      if (providerExistPhone) throw new Error("Telefone já cadastrado");

      const provider = await Provider.create({
        name: name,
        email: email,
        address: address,
        phone: phone,
        userId: id,
      });

      return res.status(200).json({
        mensagem: `O distribuidor ${provider.name} cadastrado com sucesso.`,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    const { userId: id } = req.body;

    try {
      const userExist = await User.findByPk(id);

      if (!userExist) throw new Error("Usuario precisa estar logado");
      if (userExist && userExist.role != "ADM")
        throw new Error("Usuario não possui privilégio");

      const provider = await Provider.findAll({
        where: { userId: id },
        attributes: { exclude: ["providerId", "userId"] },
      });

      return res.status(200).json(provider);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    const { userId: id, providerId, name, email, address, phone } = req.body;

    try {
      const userExist = await User.findByPk(id);

      if (!userExist) throw new Error("Usuario precisa estar logado");
      if (userExist && userExist.role != "ADM")
        throw new Error("Usuario não possui privilégio");

      const findProviderId = await Provider.findByPk(providerId);

      if (!findProviderId)
        throw new Error("Fornecor não encontrado ou não existe");
      if (id != findProviderId.userId)
        throw new Error("Você não possui permissão para essa operação.");

      const providerExistEmail = await Provider.findOne({
        where: {
          email: email,
        },
      });
      if (
        providerExistEmail &&
        providerExistEmail.email != findProviderId.email
      )
        throw new Error("Email já cadastrado");

      const providerExistPhone = await Provider.findOne({
        where: {
          phone: phone,
        },
      });
      if (
        providerExistEmail &&
        providerExistPhone.phone != findProviderId.phone
      )
        throw new Error("Telefone já cadastrado");

      const updateProvider = await findProviderId.update({
        name: name,
        email: email,
        address: address,
        phone: phone,
      });

      return res.status(200).json(updateProvider);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    const { userId: id, providerId } = req.body;

    try {
      const userExist = await User.findByPk(id);
      if (!userExist) throw new Error("Usuario precisa estar logado");
      if (userExist && userExist.role != "ADM")
        throw new Error("Usuario não possui privilégio");

      const findProviderId = await Provider.findByPk(providerId);
      if (!findProviderId)
        throw new Error("Fornecedor não encontrado ou não existe");
      if (id != findProviderId.userId)
        throw new Error("Você não possui permissão para essa operação.");

      const deleteProvider = await findProviderId.destroy();

      return res.status(200).json({
        message: `Fornecedor ${deleteProvider.name}, foi deletado com sucesso`,
      });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },
};

module.exports = providerController;
