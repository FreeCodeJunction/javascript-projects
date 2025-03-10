class RandomQuoteGenerator {
  constructor() {
    this.randomQuotes = [
      {
        id: 1,
        quote: "The only way to do great work is to love what you do.",
        writer: "Steve Jobs",
      },
      {
        id: 2,
        quote:
          "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        writer: "Martin Luther King Jr.",
      },
      {
        id: 3,
        quote: "Be the change that you wish to see in the world.",
        writer: "Mahatma Gandhi",
      },
      {
        id: 4,
        quote:
          "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        writer: "Nelson Mandela",
      },
      {
        id: 5,
        quote: "You miss 100% of the shots you don’t take.",
        writer: "Wayne Gretzky",
      },
      {
        id: 6,
        quote:
          "The best time to plant a tree was 20 years ago. The second best time is now.",
        writer: "Chinese Proverb",
      },
      {
        id: 7,
        quote: "Life is what happens when you’re busy making other plans.",
        writer: "John Lennon",
      },
      {
        id: 8,
        quote:
          "It does not matter how slowly you go as long as you do not stop.",
        writer: "Confucius",
      },
      {
        id: 9,
        quote:
          "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        writer: "Winston Churchill",
      },
      {
        id: 10,
        quote:
          "The only limit to our realization of tomorrow is our doubts of today.",
        writer: "Franklin D. Roosevelt",
      },
      {
        id: 11,
        quote: "Do what you can, with what you have, where you are.",
        writer: "Theodore Roosevelt",
      },
      {
        id: 12,
        quote:
          "The future belongs to those who believe in the beauty of their dreams.",
        writer: "Eleanor Roosevelt",
      },
      {
        id: 13,
        quote:
          "Happiness is not something ready made. It comes from your own actions.",
        writer: "Dalai Lama",
      },
      {
        id: 14,
        quote: "You must be the change you wish to see in the world.",
        writer: "Mahatma Gandhi",
      },
      {
        id: 15,
        quote: "The journey of a thousand miles begins with one step.",
        writer: "Lao Tzu",
      },
      {
        id: 16,
        quote: "Believe you can and you're halfway there.",
        writer: "Theodore Roosevelt",
      },
      {
        id: 17,
        quote: "Everything you’ve ever wanted is on the other side of fear.",
        writer: "George Addair",
      },
      {
        id: 18,
        quote:
          "The only person you are destined to become is the person you decide to be.",
        writer: "Ralph Waldo Emerson",
      },
      {
        id: 19,
        quote: "Act as if what you do makes a difference. It does.",
        writer: "William James",
      },
      {
        id: 20,
        quote: "The power of imagination makes us infinite.",
        writer: "John Muir",
      },
    ];
    this.currentQuote = this.randomQuotes[0];
    this.quoteCard = document.getElementById("quote-card");
    this.uniqueSet = new Set([0]);

    this.renderQuotes();
    document
      .querySelector("main")
      .addEventListener("click", (e) => this.selectRandomQuote(e));
  }

  selectRandomQuote(e) {
    if (e.target.classList.contains("next-quote")) {
      if (this.uniqueSet.size === this.randomQuotes.length) {
        this.uniqueSet.clear();
      }
      let randomIndex = Math.floor(Math.random() * this.randomQuotes.length);
      while (this.uniqueSet.has(randomIndex)) {
        randomIndex = Math.floor(Math.random() * this.randomQuotes.length);
      }
      this.uniqueSet.add(randomIndex);
      this.currentQuote = this.randomQuotes[randomIndex];
      this.renderQuotes();
    }
  }
  renderQuotes() {
    document.querySelector("main").innerHTML = "";
    const clonedCard = this.quoteCard.cloneNode(true);
    const { id, quote, writer } = this.currentQuote;
    clonedCard.querySelector("h2").textContent = writer;
    clonedCard.querySelector("p").textContent = quote;
    document.querySelector("main").appendChild(clonedCard);
  }
}

document.addEventListener("DOMContentLoaded", () => new RandomQuoteGenerator());
