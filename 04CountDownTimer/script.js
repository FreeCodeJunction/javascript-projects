class CountDownTimer {
  constructor() {
    this.days = document.getElementById("days");
    this.hours = document.getElementById("hours");
    this.minutes = document.getElementById("minute");
    this.seconds = document.getElementById("seconds");
    this.selectContainer = document.getElementById("js-select-container");
    this.timerSituation = {
      isTimerSet: false,
    };
    this.selectContainer.addEventListener("change", () =>
      this.handleSelection()
    );
    this.timers = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.manipulateTimers = [
      "Pick From Below",
      "Start Timer",
      "Stop timer",
      "Set Timer",
      "Reset Timer",
    ];

    this.displayTimers();
    this.renderManipulateTimers();
  }

  displayTimers() {
    const { days, hours, minutes, seconds } = this.timers;
    this.days.textContent = String(days).padStart(2, "0");
    this.hours.textContent = String(hours).padStart(2, "0");
    this.minutes.textContent = String(minutes).padStart(2, "0");
    this.seconds.textContent = String(seconds).padStart(2, "0");
  }

  renderManipulateTimers() {
    this.selectContainer.innerHTML = this.manipulateTimers.map(
      (text, index) => {
        if (this.timerSituation.isTimerSet) {
          return `<option ${index === 0 && "selected disabled"} ${
            text.includes("Set") && "disabled"
          }>${text}</option>`;
        }
        return `<option ${index === 0 && "selected"} ${
          !text.includes("Set") && "disabled"
        } >${text}</option>`;
      }
    );
  }

  handleSelection() {
    if (this.selectContainer.value.includes("Set")) {
      this.timerSituation = {
        ...this.timerSituation,
        isTimerSet: true,
      };
      this.renderManipulateTimers();
    } else if (this.selectContainer.value.includes("Start")) {
      console.log("Timer Started");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new CountDownTimer());
