//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "What is the difference between let and var in JavaScript?",
    options: ["let is block-scoped, while var is function-scoped.", "let is only used for loops, while var is used for variable declarations.", "let is function-scoped, while var is blocked-scoped.", "There is no difference between let and var."],
    correct: "let is block-scoped, while var is function-scoped.",
  },
  {
    id: "1",
    question: "Explain the concept of hoisting in JavaScript?",
    options: ["Hoisting is the process of moving all function declarations to the top of their containing scope, but not variable declarations", "Hoisting is the process of moving all variable declarations to the top of their containing scope, but not function declarations", "Hoisting is the process of moving all variable and function declarations to the top of their containing scope", " Hoisting is the process of moving all variable assignments to the top of their containing scope"],
    correct: "Hoisting is the process of moving all variable and function declarations to the top of their containing scope",
  },
  {
    id: "2",
    question: "What are closures in JavaScript?",
    options: ["Closures are functions that have access to variables from their outer scope, even after the outer scope has closed", "Closures are functions that do not have access to variables from their outer scope", "Closures are functions that are immediately invoked upon declaration", "Closures are functions that can only be called from within another function"],
    correct: "Closures are functions that have access to variables from their outer scope, even after the outer scope has closed",
  },
  {
    id: "3",
    question: "What are the differences between == and === in JavaScript?",
    options: ["== performs type coercion, while === does not", "== performs strict equality comparison, while === performs loose equality comparison", "== performs loose equality comparison, while === performs strict equality comparison", "== and === are identical in their behavior"],
    correct: "== performs loose equality comparison, while === performs strict equality comparison",
  },
  {
    id: "4",
    question: "What is the purpose of the this keyword in JavaScript? How is its value determined?",
    options: ["The this keyword refers to the current function's scope", "The this keyword refers to the global object in non-strict mode, and undefined in strict mode", "The this keyword refers to the object that is currently executing the function", "The this keyword refers to the parent function's scope"],
    correct: "The this keyword refers to the object that is currently executing the function",
  },
  {
    id: "5",
    question: "How can you achieve asynchronous programming in JavaScript prior to the introduction of Promises and async/await?",
    options: ["By using callbacks", "By using the setTimeout function", "Asynchronous programming was not possible in JavaScript before Promises and async/await", "By using the async and await keywords"],
    correct: "By using callbacks",
  },
  {
    id: "6",
    question: "What is the purpose of JSX in React.js?",
    options: ["JSX is a templating language used to define the structure of React components", "JSX is a JavaScript extension that allows you to write HTML-like code within your JavaScript files", "JSX is a built-in state management library in React.js", "JSX is used for routing in React.js applications"],
    correct: "JSX is a JavaScript extension that allows you to write HTML-like code within your JavaScript files",
  },
  {
    id: "7",
    question: "What is a functional component in React.js?",
    options: ["A functional component is a component that manages its own state using the useState hook", "A functional component is a component that receives props and returns JSX", "A functional component is a component that extends the Component class from React", "A functional component is a component that is created using the createClass method"],
    correct: "A functional component is a component that receives props and returns JSX",
  },
  {
    id: "8",
    question: "What is the purpose of the useState hook in React.js?",
    options: ["The useState hook is used to fetch data from an API in a React component", "The useState hook is used to manage state in functional components", "The useState hook is used to define global state in a React application", "The useState hook is used to handle user inputs in forms"],
    correct: "The useState hook is used to manage state in functional components",
  },
  {
    id: "9",
    question: "What is Next.js and what problem does it solve in React.js development?",
    options: ["Next.js is a CSS framework for styling React components", "Next.js is a React framework that provides server-side rendering, routing, and other features out of the box", "Next.js is a state management library for React applications", "Next.js is a tool for automating React component testing"],
    correct: "Next.js is a React framework that provides server-side rendering, routing, and other features out of the box",
  },

];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
