export const ValidateCPF = (cpf: string) => {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let result = true;

  [9, 10].map(function (j) {
    let soma = 0;
    let resto;
    cpf
      .split(/(?=)/)
      .splice(0, j)
      .map(function (e, i) {
        soma += parseInt(e) * (j + 2 - (i + 1));
      });
    resto = soma % 11;
    resto = resto < 2 ? 0 : 11 - resto;

    const subString = cpf.substring(j, j + 1);
    if (resto.toString() !== subString) {
      result = false;
    }
  });
  return result;
};
