var startButton = document.querySelector(".start-button"); 
var question = document.querySelector("#question");
var questionText = document.querySelector("#questiontext");
var answerOne = document.querySelector("#answerOne");
var answerTwo = document.querySelector("#answerTwo");
var answerThree = document.querySelector("#answerThree");
var answerFour = document.querySelector("#answerFour");
var highScore = document.querySelector("#highscore");
var timer = document.querySelector("timer");
var timerElement = document.querySelector("#time-left");
var questionInput = document.querySelector("#question-input");

var correctResponse = ["Correct!", "That is correct!", "Good job!", "You did it!"];
var incorrectResponse = ["That's not right", "Wrong again", "Incorrect", "That's incorrect"];
var answeredQuestion = false;
var aWin = false;
var highScoresList = [];
var initials;
var timer;
var timerCount;
var currentQuestion = 0;
var userCorrectAnswers = 0;
var highScoresOff = true;

var quizQuestions = [
    {
        question: "Commonly used data type Do Not include:---",
        answers: {
            a: "Strings",
            b: "Booleans",
            c: "Alerts",
            d: "Numbers",
        },
        correctAnswer: "c"
    },
    {
        question: "The condition in an if/else statement is enclosed within:---",
        answers: {
            a: "quotes",
            b: "curly brackets",
            c: "parentheses",
            d: "square brackets",
        },
        correctAnswer: "c"
    },
    {
        question: "Arrays in JavaScript can be used to store:---",
        answers: {
            a: "numbers and strings",
            b: "other arrays",
            c: "booleances",
            d: "all of the above",
        },
        correctAnswer: "d"
    },
    {
        question: "What must string values be enclosed in when being assigned to variables?",
        answers: {
            a: "commas",
            b: "curly brackets",
            c: "quotes",
            d: "parentheses",
        },
        correctAnswer: "c"
    },
    {
        question: "What does CSS stand for?",
        answers: {
            a: "Cascading Stylish Stuff",
            b: "Cascading Style Sheets",
            c: "Can't Stop Studing",
            d: "Coding Style Sheets",
        },
        correctAnswer: "b"
        },
];

//starts quiz
function startQuiz() {
    $("ol").show();
    timerCount = 30;
    currentQuestion = 0;
    userCorrectAnswers = 0;
    startTimer();
    displayQuestions(quizQuestions[currentQuestion]);
};

//checks answers
$(".answeritem").on("click",function (evt){
    $answer = $(evt.target);

    var q =quizQuestions[currentQuestion]
    var correct = q.answers[q.correctAnswer];

    console.log(correct);
    console.log($answer.text());
    console.log(correct == $answer.text());

    if (correct == $answer.text()){
        userCorrectAnswers++;
        questionInput.textContent = correctResponse[Math.floor(Math.random()*3)];
    } else {
        timerCount = timerCount - 5;
        questionInput.textContent = incorrectResponse[Math.floor(Math.random()*3)] + "You've lost 5 seconds!";
    };

    if (currentQuestion <= 4){
        currentQuestion++
        console.log(quizQuestions[currentQuestion]);
        displayQuestions(quizQuestions[currentQuestion]);
    }  else {
        timerCount = 0;
    }
})
//ends game and gives results
function endGame() {
    $("ol").hide();
    initials = prompt("Please enter your initials");
    initials = initials.toUpperCase();
    questionText.textContent = initials + " correct answer " + userCorrectAnswers + " questions out of 5 questions."
    questionInput.textContent = "Your score is " + (userCorrectAnswers/5 * 100) + "%."
    
    //saves initials and score
    highScoresList.push(initials,userCorrectAnswers);

    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));

    startButton.disabled = false;
}

function displayQuestions(q){
        questionText.textContent = q.question;
        answerOne.textContent = q.answers.a;
        answerTwo.textContent = q.answers.b;
        answerThree.textContent = q.answers.c;
        answerFour.textContent = q.answers.d;
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            if (aWin && timerCount > 0) {
                clearInterval(timer);
            }
        }

        if (timerCount <= 0) {
            clearInterval(timer);
            timerElement.textContent = "0";
            endGame();
        }
    }, 1000);
}

// view high scores

function viewHighScores(){

    if (highScoresOff){
        storedHighScore = [];
        storedHighScore.length = 0;
        highScoresOff = false;
        $("#highscorecontainer").show();
        storedHighScore = JSON.parse(localStorage.getItem("highscoreslist"));
        console.log(storedHighScore);
        console.log(storedHighScore.length)

        for (var i = 0; i < storedHighScore.length; i=i+2){
            $("#highscorelist").append('<li>' + storedHighScore[i] + " " + storedHighScore[i+1]+ '</li>');
        }
        } else {
            highScoresOff = true;
            $("#highscontainer").hide();
            $('#highscorelist').empty();

        }
    }


startButton.addEventListener("click", startQuiz);
$("#highscore").on("click", viewHighScores);

