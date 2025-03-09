class Calculator {
  constructor() {
    this.calculatorBtnContainer = document.getElementById(
      "calculator-buttons-container"
    );
    this.displayCalculation = document.getElementById("display-calculation");
    this.displayText = "";
    this.calculatorBtnContainer.addEventListener("click", (event) =>
      this.handleClickEvent(event)
    );
  }

  renderDisplayText() {
    this.displayCalculation.textContent = this.displayText;
  }

  handleClickEvent(event) {
    const ignoreButtons = ["CE", "C", "del", "="];
    const element = event.target;
    if (ignoreButtons.includes(element.textContent.trim())) {
      if (this.displayText === "Invalid Math") {
        this.displayText = "";
      }
      this.handleIgnoreButtons(element);
    }

    if (!element.id && !ignoreButtons.includes(element.textContent.trim())) {
      if (this.displayText === "Invalid Math") {
        this.displayText = "";
      }
      this.displayText +=
        element?.dataset.text ||
        element?.children[0]?.dataset.text ||
        element.textContent.trim();

      this.renderDisplayText();
    }
  }

  handleIgnoreButtons(element) {
    const innerText = element.textContent.trim();
    if (innerText === "CE" || innerText === "C") {
      this.displayText = "";
    } else if (innerText === "del") {
      this.displayText = this.displayText.slice(0, this.displayText.length - 1);
    } else if (innerText === "=") {
      if (
        this.displayText.includes("**") ||
        this.displayText.includes("--") ||
        this.displayText.includes("//") ||
        this.displayText.includes("++") ||
        this.displayText.includes("..") ||
        this.displayText.startsWith("00")
      ) {
        this.displayText = "Invalid Math";
      } else {
        this.displayText = eval(this.displayText).toString();
      }
    }
    this.renderDisplayText();
  }
}

document.addEventListener("DOMContentLoaded", () => new Calculator());
