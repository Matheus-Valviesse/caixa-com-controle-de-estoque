const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const Provider = require("../models/Provider.js");
const User = require("../models/User.js");
const entryProduct = require("../functions/entryProduct.js");
const emailConfirmationTemplate = require("../functions/templateUserConfirmationEmail.js");
const emailRecoverPasswordTemplate = require("../functions/templateUserRecoverPassword.js");
const randomPasswordGenerate = require("../functions/ramdomPasswordGenerate.js");
const { Op, Model } = require("sequelize");
const validate = require("../functions/validate.js");
const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv");
const defineValue = require("../functions/defineValue.js");

dotenv.config();

const productController = {
  create: async (req, res) => {
    const {
      userId: id,
      name,
      description,
      price,
      amount,
      colors,
      image,
      categoryId,
      providerId,
    } = req.body;

    try {
      validate({ name, isRequired: true });
      validate({ description, isRequired: true });
      validate({ price, type: "valores", isRequired: true });
      const newPrince = defineValue(price);
      validate({ amount, type: "numero" });
      validate({ colors, isRequired: true });
      validate({ image, isRequired: true });
      validate({ categoryId, isRequired: true });
      validate({ providerId, isRequired: true });

      const findCategory = await Category.findByPk(categoryId);
      if (!findCategory) throw new Error("Categoria deve ser adicionada");

      const findProvider = await Provider.findByPk(providerId);
      if (!findProvider) throw new Error("Provedor deve ser adicionado");

      const findName = await Product.findOne({ where: { name: name } });
      if (findName) throw new Error("Nome do produto já em uso");

      if (amount.includes(".") || amount.includes(",") || amount < 0)
        throw new Error(
          "Quantidade não pode conter numeros com virgula ou negativos"
        );

      if (amount == (null || undefined || "" || " ")) amount = 0;

      const createProduct = await Product.create({
        name: name,
        description: description,
        price: newPrince,
        amount: amount,
        colors: colors,
        image: image,
        userId: id,
        categoryId: categoryId,
        providerId: providerId,
      });

      if (amount > 0)
        entryProduct(createProduct.productId, "Cadastro", createProduct.amount);

      return res.status(200).json({
        mensagem: `O produto ${createProduct.name}, foi cadastrado com sucesso.`,
      });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const { userId: id, productId } = req.body;

      const findProduct = await Product.findAll({ where: { userId: id } });

      return res.status(200).json(findProduct);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  productQuantityUpdate: async (req, res) => {
    const { productId, amount } = req.body;

    try {
      const findProduct = Product.findByPk(productId);

      if (!findProduct)
        throw new Error("Produto não encontrado ou não existe.");

      const currentAmount = findProduct.amount;

      const newProductQuantity = findProduct.update({
        amount: currentAmount + amount,
      });

      entryProduct(
        newProductQuantity.productId,
        "Cadastro",
        createProduct.amount
      );
      
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },
};

module.exports = productController;
