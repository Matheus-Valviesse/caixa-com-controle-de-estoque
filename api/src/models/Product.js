const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");
const Category = require("./Category.js");
const Provider = require("./Provider.js");
const User = require("./User.js");

const Product = sequelize.define(
  "products",
  {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    colors: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Product.sync({ force: true });

// // Criando um índice secundário na coluna 'userId' da tabela 'User'
// const createIndexQueryU = "CREATE INDEX userId_index ON types (userId);";

// // Executando a consulta SQL personalizada usando o método query() do Sequelize
// const u = async () => {
//   await sequelize.query(createIndexQueryU);
// };
// u

// Product.belongsTo(User, { foreignKey: "userId" });
// User.hasMany(Product, { foreignKey: "userId" });
// Product.hasOne(User, { foreignKey: "userId" });

//=====================================================================

// const createIndexQueryC = "CREATE INDEX categoryId_index ON types (categoryId);";

// const c = async () => {
//   await sequelize.query(createIndexQueryC);
// };
// c

// Category.belongsTo(Product, { foreignKey: "categoryId" });
// Category.hasMany(Product, { foreignKey: "categoryId" });
// Product.hasOne(Category, { foreignKey: "categoryId" });

//=====================================================================

// const createIndexQueryP = "CREATE INDEX providerId_index ON types (providerId);";

// const p = async () => {
//   await sequelize.query(createIndexQueryP);
// };
// p

// Provider.belongsTo(Product, { foreignKey: "providerId" });
// Provider.hasMany(Product, { foreignKey: "providerId" });
// Product.hasOne(Provider, { foreignKey: "providerId" });

module.exports = Product;
