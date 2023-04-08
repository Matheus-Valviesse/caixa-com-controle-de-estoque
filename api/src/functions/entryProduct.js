const TableEntry = require("../models/TableEntry.js");

const entryProduct = (productIds, motives, amounts) => {
  const newDate = new Date();

  const day = newDate.getDay();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const atualDate = `${day}/${month}/${year}`;

  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();

  const atualHour = `${hour}:${minutes}`;

  try {
    const insertTableEntry = TableEntry.create({
      productId: productIds,
      date: atualDate,
      time: atualHour,
      motive: motives,
      amount: amounts,
    });

    console.log("dado foi atribuido com sucesso");
  } catch (error) {
 
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = entryProduct;
