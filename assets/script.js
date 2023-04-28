const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hypertext Makeup Lingo", "Hello Markup Language", "Hyperspeed Markup Language"],
    answer: "Hypertext Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: ["Crushing Style Sheets", "Cruisng Style Stickers", "Cascading Style Sheets", "Cool Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does js stand for?",
    options: ["Javascript", "Jerryscript", "Javaslide", "Javaslip"],
    answer: "Javascript"
  }
];

const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question");

let questionIndex = 0;
let score = 0;
let timer = 60;
let timerInterval;

function startQuiz() {
  startButton.style.display = "none";
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const currentQuestion = quizData[questionIndex];
  questionContainer.innerHTML = `
    <h2>${currentQuestion.question}</h2>
    ${currentQuestion.options
      .map(
        option =>
          `<button class="answer-button">${option}</button>`
      )
      .join("")}
  `;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = timer;
    if (timer === 0) {
      endQuiz();
    }
  }, 1000);
}

function handleAnswerButtonClick(event) {
  const selectedOption = event.target.textContent;
  const correctAnswer = quizData[questionIndex].answer;
  if (selectedOption === correctAnswer) {
    score++;
  } else {
    timer -= 10;
  }
  questionIndex++;
  if (questionIndex === quizData.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.innerHTML = `
    <h2>Quiz Complete!</h2>
    <p>Your score is ${score}.</p>
    <form>
      <label for="initials">Enter your initials:</label>
      <input type="text" id="initials" name="initials" required>
      <button type="submit">Submit</button>
    </form>
  `;
}

startButton.addEventListener("click", startQuiz);
questionContainer.addEventListener("click", event => {
  if (event.target.classList.contains("answer-button")) {
    handleAnswerButtonClick(event);
  }
});
