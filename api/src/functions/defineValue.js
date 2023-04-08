const defineValue = (numb) => {
  if(numb < 0 ) throw new Error("Valor não pode ser negátivo.");
  
  const number = String(numb);

  if (number.includes(".")) {
    const newNumber = number.split(".");

    if (newNumber[1].length == 1)
      return newNumber[0] + "." + newNumber[1] + "0";

    if (newNumber[1].length == 2) return newNumber[0] + "." + newNumber[1];

    if (newNumber[1].length >= 3)
      throw new Error("Valor não pode conter mais de 2 digitos após a virgula.");
  } else {
    return number + ".00";
  }
};

module.exports = defineValue;
