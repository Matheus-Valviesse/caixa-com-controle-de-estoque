const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");
const User = require("./User.js");

const Provider = sequelize.define(
  "providers",
  {
    providerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Provider.sync({ force: true });

// O planetScale não aceita foreign keys então é necessario
// a criação de um indice paralelo que ainda assim garante
// a relação entre as entidades, segue abaixo o codido
// utilizado para resolver o problema:

// // Criando um índice secundário na coluna 'userId' da tabela 'Provider'
// const createIndexQuery = "CREATE INDEX userId_index ON types (userId);";

// // Executando a consulta SQL personalizada usando o método query() do Sequelize
// const f = async () => {
//   await sequelize.query(createIndexQuery);
// };
// f

Provider.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Provider, { foreignKey: "userId" });
Provider.hasOne(User, { foreignKey: "userId" });

module.exports = Provider;
