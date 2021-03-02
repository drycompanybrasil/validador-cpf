class ValidateCpf {
  constructor() {
    this.el = document.querySelector("#cpf");
    this.el.setAttribute("maxlength", "14");
    this.form = document.querySelector(".form-group");
    this.start();
  }

  assembleTheString(event) {
    var number = event.target.value;
    if (number.length == 3 || number.length == 7) {
      event.target.value += ".";
    }
    if (number.length == 11) {
      event.target.value += "-";
    }
    return number;
  }

  clearString(number) {
    return number.replace(/\D/g, "");
  }

  verifyLenght(number) {
    if (number.length === 11) {
      return true;
    }
  }

  validDefault(number) {
    if (
      number !== "00000000000" ||
      number !== "11111111111" ||
      number !== "22222222222" ||
      number !== "33333333333" ||
      number !== "44444444444" ||
      number !== "55555555555" ||
      number !== "66666666666" ||
      number !== "77777777777" ||
      number !== "88888888888" ||
      number !== "99999999999"
    ) {
      return true;
    }
  }

  validCpf(number) {
    var repeticao = 11;
    var acumulador = 0;

    for (var i = 0; i < number.slice(0, 9).length; i++) {
      var resultado = parseInt(number.slice(0, 9)[i]) * --repeticao;
      acumulador += resultado;
    }

    var penultimoDigito = 11 - (acumulador % 11) >= 10 ? 0 : 11 - (acumulador % 11);

    var repeticao = 11;
    var acumulador = 0;

    for (var i = 0; i < number.slice(0, 10).length; i++) {
      var resultado = parseInt(number.slice(0, 10)[i]) * repeticao--;
      acumulador += resultado;
    }

    var ultimoDigito = 11 - (acumulador % 11) >= 10 ? 0 : 11 - (acumulador % 11);
    var digitosGerados = `${penultimoDigito}${ultimoDigito}`;

    return digitosGerados;
  }

  start() {
    this.el.addEventListener("input", (element) => {
      const numberFormatted = this.assembleTheString(element);
      const numberClear = this.clearString(numberFormatted);
      const validLenght = this.verifyLenght(numberClear);

      if (validLenght) {
        const validDefault = this.validDefault(numberClear);
        if (validDefault) {
          const validCpf = this.validCpf(numberClear);
          if (numberClear.substring(9) === validCpf) {
            console.log("CPF válido");
          } else {
            console.log("cpf inválido");
          }
        }
      }
    });
  }
}

new ValidateCpf();
