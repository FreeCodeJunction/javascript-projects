class BMICalculator {
  constructor() {
    this.maxHumanHeight = 2.72;
    this.minHumanHeight = 1.1;
    this.maxHumanWeight = 120;
    this.minHumanWeight = 30;
    this.isHeightOk = false;
    this.isWeightOk = false;
    this.cardBody = document.getElementById("card-body");
    this.inputs = [
      ["Height", document.querySelector(".height-input")],
      ["Weight", document.querySelector(".weight-input")],
    ];
    this.hintsInput = document.querySelector(".hints-input");
    this.showResult = document.getElementById("show-result");
    this.cardBody.addEventListener("click", (e) => this.calculateBMI(e));
    this.inputs.forEach((input) => {
      input[1].addEventListener("input", () => {
        this.validateInputs(input[1], input[0]);
      });
    });
  }
  calculateBMI(e) {
    if (e.target.classList.contains("calculate-btn")) {
      const height = Number(this.inputs[0][1].value);
      const weight = Number(this.inputs[1][1].value);
      const BMI = (weight / height ** 2).toFixed(1);
      let category = null;
      if (BMI < 18.5) {
        category = "Underweight";
      } else if (BMI >= 18.5 && BMI <= 24.9) {
        category = "Healthy";
      } else if (BMI > 24.9 && BMI <= 29.9) {
        category = "Overweight";
      } else {
        category = "Obesity";
      }
      const html = `
      <h1 class='text-center text-2xl font-medium'>Your BMI is ${BMI}</h1>
      <h1 class='text-center text-2xl font-medium'>Category: ${category}</h1>
`;
      this.showResult.innerHTML = html;
    }
  }
  showHints(str, key, addCls = "text-red-600", remCls = "text-green-600") {
    this.hintsInput.innerText = str;
    this.hintsInput.classList.add(addCls);
    this.hintsInput.classList.remove(remCls);
    this[`is${key}Ok`] = false;
    document.querySelector(".calculate-btn").setAttribute("disabled", false);
  }
  validateInputs(element, key) {
    const value = element.value;

    if (value === "") {
      this.showHints(key + " can't be empty", key);
      return;
    }
    if (value.startsWith("0")) {
      this.showHints(key + " can't start with zero", key);
      return;
    }

    if (Number(value) < this[`minHuman${key}`]) {
      this.showHints(key + " is too low", key);
      return;
    }
    if (Number(value) > this[`maxHuman${key}`]) {
      this.showHints(key + " is too high", key);
      return;
    }
    this[`is${key}Ok`] = true;
    this.hintsInput.classList.add("text-green-600");
    this.hintsInput.classList.remove("text-red-600");
    this.hintsInput.textContent = key + "is ok";
    if (this.isHeightOk && this.isWeightOk) {
      this.hintsInput.innerText = "All ok";
      this.hintsInput.classList.add("text-green-600");
      this.hintsInput.classList.remove("text-red-600");

      document
        .querySelector(".calculate-btn")
        .removeAttribute("disabled", false);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new BMICalculator());
