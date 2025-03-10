class CountDownTimer {
  constructor() {
    this.days = document.getElementById("days");
    this.hours = document.getElementById("hours");
    this.minutes = document.getElementById("minute");
    this.seconds = document.getElementById("seconds");
    this.selectContainer = document.getElementById("js-select-container");
    this.timerSituation = {
      isTimerSet: false,
      isTimerRunning: false,
    };

    this.timers = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.milSeconds = null;
    this.manipulateTimers = [
      "Pick From Below",
      "Start Timer",
      "Stop timer",
      "Set Timer",
      "Reset Timer",
    ];
    this.limitIndicator = [
      { maxLimit: 10, str: "Set Days", dataset: "days" },
      { maxLimit: 24, str: "Set Hours", dataset: "hours" },
      { maxLimit: 60, str: "Set Minutes", dataset: "minutes" },
    ];
    this.currentIndicatorIndex = 0;
    this.limit = null;
    this.intervalId = null;
    this.setLimit(59);
    this.selectContainer.addEventListener("change", () =>
      this.handleSelection()
    );

    this.displayTimers();
    this.renderManipulateTimers();
  }

  resetTimer() {
    clearInterval(this.intervalId);
    this.timers = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.timerSituation = {
      isTimerSet: !this.timerSituation.isTimerSet,
      isTimerRunning: false,
    };
    this.milSeconds = null;
    this.intervalId = null;
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
        if (index === 0) {
          return `<option disabled selected>${text}</option>`;
        }
        if (this.timerSituation.isTimerSet) {
          if (text.includes("Set")) {
            return `<option disabled>${text}</option>`;
          }
          if (this.timerSituation.isTimerRunning && text.includes("Start")) {
            return `<option disabled>${text}</option>`;
          } else if (
            !this.timerSituation.isTimerRunning &&
            text.includes("Stop")
          ) {
            return `<option disabled>${text}</option>`;
          }
        } else {
          if (!text.includes("Set")) {
            return `<option disabled>${text}</option>`;
          }
        }
        return `<option>${text}</option>`;
      }
    );
  }

  startTimer() {
    if (this.milSeconds < 1) {
      alert("Timer can't be set to Zero");
      this.resetTimer();
      return;
    }
    this.timerSituation = {
      ...this.timerSituation,
      isTimerRunning: true,
    };
    this.renderManipulateTimers();
    this.intervalId = setInterval(() => {
      if (this.milSeconds < 1) {
        this.resetTimer();
        return;
      }
      this.milSeconds--;
      this.timers = {
        days: Math.floor(this.milSeconds / 86400),
        hours: Math.floor((this.milSeconds % 86400) / 3600),
        minutes: Math.floor(((this.milSeconds % 86400) % 3600) / 60),
        seconds: ((this.milSeconds % 86400) % 3600) % 60,
      };
      this.displayTimers();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.timerSituation = {
      ...this.timerSituation,
      isTimerRunning: false,
    };
    this.renderManipulateTimers();
  }

  handleSelection() {
    const selectValue = this.selectContainer.value;
    if (selectValue.includes("Set")) {
      this.renderLimits(this.currentIndicatorIndex);
    } else if (selectValue.includes("Reset")) {
      this.resetTimer();
    } else if (selectValue.includes("Start")) {
      this.startTimer();
    } else {
      this.stopTimer();
    }

    if (!isNaN(selectValue)) {
      const indicator = this.selectContainer.dataset?.indicator;
      if (indicator) {
        this.timers[indicator] = Number(selectValue);
        this[indicator].textContent = String(this.timers[indicator]).padStart(
          2,
          "0"
        );
      }
      this.renderLimits(this.currentIndicatorIndex);
    }
  }

  renderLimits(index) {
    if (this.currentIndicatorIndex >= this.limitIndicator.length) {
      this.timerSituation = {
        ...this.timerSituation,
        isTimerSet: !this.timerSituation.isTimerSet,
      };
      this.currentIndicatorIndex = 0;
      const { days, hours, minutes } = this.timers;
      this.milSeconds = days * 86400 + hours * 3600 + minutes * 60;
      this.renderManipulateTimers();
      return;
    }
    const { maxLimit, str, dataset } = this.limitIndicator[index];
    this.selectContainer.setAttribute("data-indicator", dataset);
    this.selectContainer.innerHTML =
      `<option selected disabled>${str}</option>` +
      this.limit
        .slice(0, maxLimit)
        .map((num) => `<option>${num}</option>`)
        .join("");
    this.currentIndicatorIndex++;
  }

  setLimit(limit) {
    for (let i = 0; i <= limit; i++) {
      (this.limit || (this.limit = [])).push(i);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new CountDownTimer());
