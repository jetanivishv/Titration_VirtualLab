function endQuiz(){
    document.getElementById("container1").innerHTML=score;
}

function startQuiz() {
  document.getElementById("rules").style.display = "none";
  document.getElementById("start").style.display = "none";
  document.getElementById("quizes").style.display = "block";

  const question = document.getElementById("question");
  const choices = Array.from(document.getElementsByClassName("choice-text"));
  const progressText = document.getElementById("progressText");
  const scoreText = document.getElementById("score");
  const quiz = document.getElementById("quiz");
  let currentQuestion;
  let acceptingAnswers = true;
  let score = 0;
  let questionCounter = 0;
  let availableQuestions = [];
  let questions = [];
  let a = 0;
  let b = 0;
  let flag = false;
  let classToApply;

  let MAX_QUESTIONS=10;

  const fetchQuestions = () => {
    fetch('./Questions/questions.json')
      .then((res) => {
        return res.json();
      })
      .then((loadedQuestions) => { 
        questions=loadedQuestions;     
        startGame(); // move the function call inside this block
    })
      .catch((err) => {
        console.error(err);
      });
  };

  fetchQuestions();

  //CONSTANTS
  const CORRECT_BONUS = 1;

  let startGame = () => {
    questionCounter = 1;
    score = 0;
    availableQuestions = [...questions];
    nextquestion();
    setTimeout(() => {
        quiz.classList.remove('hidden');
},500);
  };
  let nextquestion;

  nextquestion = () => {
    if(questionCounter>MAX_QUESTIONS){
        endQuiz();
       }
   
    if (a != 0) {
      a.remove(classToApply);
    }
    if (flag) {
      b.remove("correct");
      flag = false;
    }

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    questionCounter++;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.Question;
    choices.forEach((choice) => {
      const id = choice.dataset["id"];
      choice.innerText = currentQuestion["Option" + id];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };
  var btn = document.getElementById("btnn");
  btn.addEventListener("click", nextquestion);

  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["id"];
      classToApply =
      selectedAnswer === currentQuestion.Correct[currentQuestion.Correct.length-1] ? "correct" : "incorrect";
      if (classToApply === "correct") {
          incrementScore(CORRECT_BONUS);
        } else {
            let data = document.getElementsByClassName("choice-text");

        for (let i = 0; i < data.length; i++) {
          if (data[i].dataset["id"] == currentQuestion.Correct[currentQuestion.Correct.length-1]) {
            b = data[i].parentElement.classList;
            b.add("correct");
            flag = true;
            break;
          }
        }
      }

      selectedChoice.parentElement.classList.add(classToApply);
      a = selectedChoice.parentElement.classList;
    });
  });

  let incrementScore = (num) => {
    score += num;
    scoreText.innerText = "Score " + String(score);
  };
}
