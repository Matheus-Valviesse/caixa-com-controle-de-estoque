const { verify } = require("jsonwebtoken");
require("dotenv").config();

const checkToken = async (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  console.log(token)
  if (!token) return res.status(402).json({ erro: "Token inválido." });

  try {
    const { userId, role } = verify(token, process.env.PRIVATE_KEY);
    if (userId) req.body.userId = userId;
    if (role) req.body.role = role;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido." });
  }
};

module.exports = checkToken;
