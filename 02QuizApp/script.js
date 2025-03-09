import { quizzes } from "./quizzes.js";
class QuizApp {
  constructor(quizArray) {
    this.quizzes = quizArray;
    this.btnStyleClasses = ["primary", "secondary", "accent", "info"];
    this.cardContainer = document.getElementById("card-container");
    this.totalQuestion = document.getElementById("total-question");
    this.rightAnswer = document.getElementById("right-answer");
    this.wrongAnswer = document.getElementById("wrong-answer");
    this.totalMarks = document.getElementById("total-marks");
    this.stats = {
      questionLeft: this.quizzes.length,
      rightAnswers: 0,
      wrongAnswers: 0,
      totalMark: 0,
    };
    this.currentQuestion = this.quizzes[0];
    this.renderQuestion();
    this.setStats();
    this.cardContainer.addEventListener("click", (event) =>
      this.handleOptionsClick(event)
    );
  }

  renderQuestion() {
    this.cardContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    const { question, options, category } = this.currentQuestion;
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card-body");
    cardDiv.innerHTML = `
          <h2 class="card-title" >${category}</h2>
          <p class="text-base">
          ${question}
          </p>
          <div class="card-actions justify-evenly mt-3 " id="options-container" ">
    ${this.renderOptions(options)}
        </div>`;

    fragment.appendChild(cardDiv);
    this.cardContainer.appendChild(fragment);
  }

  renderOptions(options) {
    return options
      .map(
        (option, index) =>
          `<button class="btn btn-${this.btnStyleClasses[index]} transition-colors">${option}</button>`
      )
      .join("");
  }

  setStats() {
    const { questionLeft, rightAnswers, wrongAnswers, totalMark } = this.stats;
    this.totalQuestion.textContent = String(questionLeft).padStart(2, "0");
    this.rightAnswer.textContent = String(rightAnswers).padStart(2, "0");
    this.wrongAnswer.textContent = String(wrongAnswers).padStart(2, "0");
    this.totalMarks.textContent = String(totalMark).padStart(2, "0");
  }

  handleRightAndWrong(borderAndBackgroundColor, textColor, optionBtn) {
    this.setStats();
    optionBtn.style.backgroundColor = optionBtn.style.borderColor =
      borderAndBackgroundColor;
    optionBtn.style.color = textColor;
    Array.from(optionBtn.parentElement.children).forEach((btn) => {
      if (btn.style.backgroundColor !== borderAndBackgroundColor) {
        btn.setAttribute("disabled", true);
      }
    });

    if (this.stats.questionLeft < 1) {
      const quizOverTimeoutId = setTimeout(() => {
        this.cardContainer.innerHTML = `<h1 class="text-center">Quiz Over!!!</h1>
        <div class="stats shadow mb-5">
          <div class="stat place-items-center">
            <div class="stat-title">Total Questions</div>
            <div class="stat-value" id="total-question">${this.quizzes.length}</div>
          </div>
          </div>`;
        clearTimeout(quizOverTimeoutId);
      }, 1000);
      return;
    }

    const nextIndex =
      this.quizzes.findIndex((quiz) => this.currentQuestion.id === quiz.id) + 1;
    this.currentQuestion = this.quizzes[nextIndex];
    const timeoutId = setTimeout(() => {
      this.renderQuestion();
      clearTimeout(timeoutId);
    }, 1000);
  }

  handleOptionsClick(event) {
    const optionBtn = event.target;
    if (optionBtn.classList.contains("btn")) {
      const rightAnswer = this.currentQuestion.answer;

      if (optionBtn.innerText.trim() === rightAnswer) {
        this.stats = {
          ...this.stats,
          questionLeft: this.stats.questionLeft - 1,
          rightAnswers: this.stats.rightAnswers + 1,
          totalMark: this.stats.totalMark + 10,
        };

        this.handleRightAndWrong("green", "white", optionBtn);
      } else {
        this.stats = {
          ...this.stats,
          questionLeft: this.stats.questionLeft - 1,
          wrongAnswers: this.stats.wrongAnswers + 1,
          totalMark: this.stats.totalMark - 10,
        };
        this.handleRightAndWrong("red", "white", optionBtn);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new QuizApp(quizzes));
