const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  currentQuestionIndex = 0;
  scoreSpan.textContent = score;

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  progressBar.style.width = `${
    (currentQuestionIndex / quizQuestions.length) * 100
  }%`;

  currentQuestion.answers.forEach((answer, index) => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer.text;
    answerButton.classList.add("answer-btn");

    answerButton.dataset.correct = answer.correct;

    answerButton.addEventListener("click", () => {
      if (answersDisabled) return;
      answersDisabled = true;

      if (answerButton.dataset.correct === "true") {
        score++;
        answerButton.classList.add("correct");
      } else {
        answerButton.classList.add("incorrect");
        const correctAnswer = currentQuestion.answers.find((a) => a.correct);
        const correctButton = Array.from(answersContainer.children).find(
          (btn) => btn.textContent === correctAnswer.text
        );
        if (correctButton) {
          correctButton.classList.add("correct");
        }
      }
      scoreSpan.textContent = score;
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        setTimeout(() => {
          showQuestion();
        }, 1000);
      } else {
        setTimeout(() => {
          showResults();
        }, 1000);
      }
    });

    answersContainer.appendChild(answerButton);
  });
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;
  resultMessage.textContent =
    score >= quizQuestions.length / 2 ? "Good job!" : "Better luck next time!";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;
  answersContainer.innerHTML = "";
  progressBar.style.width = "0%";
  // Reset the quiz state
  startButton.textContent = "Start Quiz";
  startButton.disabled = false;
  answersDisabled = false;
}
