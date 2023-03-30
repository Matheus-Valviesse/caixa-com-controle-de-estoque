const Category = require("../models/Category.js");
const User = require("../models/User.js");
const emailConfirmationTemplate = require("../functions/templateUserConfirmationEmail.js");
const emailRecoverPasswordTemplate = require("../functions/templateUserRecoverPassword.js");
const randomPasswordGenerate = require("../functions/ramdomPasswordGenerate.js");
const { Op, Model } = require("sequelize");
const validate = require("../functions/validate.js");
const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const categoryController = {
  create: async (req, res) => {
    const { userId: id, name, description } = req.body;

    try {
      validate({ name, isRequired: true });
      validate({ description, isRequired: true });

      const userExist = await User.findByPk(id);
        console.log(id)
      if (!userExist) throw new Error("Usuario precisa estar logado");
      if (userExist && userExist.role != "ADM")
        throw new Error("Usuario não possui privilégio");

      const categoryExistName = await Category.findOne({
        where: {
          name: name,
        },
      });
      if (categoryExistName) throw new Error("Email já cadastrado");

      const category = await Category.create({
        name: name,
        description: description,
        userId:id
      });

      return res.status(200).json({
        mensagem: `A categoria ${category.name} cadastrada com sucesso.`,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },


};

module.exports = categoryController;
