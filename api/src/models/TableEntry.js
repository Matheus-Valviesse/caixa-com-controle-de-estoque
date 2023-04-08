const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");
const Product = require("./Product.js");

const TableEntry = sequelize.define(
  "tableentrys",
  {
    tableEntryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motive: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
// TableEntry.sync({ force: true });

module.exports = TableEntry;
