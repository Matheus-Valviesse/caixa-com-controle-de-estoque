const User = require("../models/User.js");

const checkUser = async (req, res, next) => {
  const { userId: id, role: role } = req.body;

  try {
    if (!id) throw new Error("Usuario precisa estar logado");

    if (role != "ADM") throw new Error("Usuário não possui privilégio")
    
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = checkUser;
