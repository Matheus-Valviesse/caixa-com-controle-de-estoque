const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");

const Reason = sequelize.define(
  "reasons",
  {
    reasonsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Reason.sync({ force: true });

module.exports = Reason;
