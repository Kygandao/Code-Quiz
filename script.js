const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startQuiz);

const nextQuestionButton = document.getElementById('next-button');
nextQuestionButton.addEventListener('click', () => {
    currentQuestion++
    nextQuestion()
})

const highscoreButton = document.getElementById('highscore-button');

const instructions = document.getElementById('instructions');

const quizTitle = document.getElementById('title');

const timerEl = document.getElementById('timer');

const questionSection = document.getElementById('question-section');

let randomQuestion, currentQuestion;

const questionDisplay = document.getElementById('question-display');
const answerButtons = document.getElementById('answer-buttons')

const questionsArray = [
    {
        question: 'In JavaScript, what is a block of code called that is used to perform a specific task?',
        answers: [
            { text: 'String', correct: false },
            { text: 'Variable', correct: false },
            { text: 'Declaration', correct: false },
            { text: 'Function', correct: true },
        ],
    },

    {
        question: 'What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?',
        answers: [
            { text: 'Conditional Loop', correct: false },
            { text: 'While Loop', correct: true },
            { text: 'Else Loop', correct: false },
            { text: 'For Loop', correct: false },
        ],
    },

    {
        question: 'What is a JavaScript element that represents either TRUE or FALSE values?',
        answers: [
            { text: 'Condition', correct: false },
            { text: 'Event', correct: false },
            { text: 'Boolean', correct: true },
            { text: 'RegExp', correct: false },
        ],
    },

    {
        question: 'What is the function of Array object that runs through each element of the array?',
        answers: [
            { text: 'every()', correct: false },
            { text: 'forEach()', correct: true },
            { text: 'filter()', correct: false },
            { text: 'concat()', correct: false },
        ],
    },

]


function startQuiz() {
    startButton.classList.add('hidden');
    timerEl.classList.remove('hidden');
    questionSection.classList.remove('hidden');
    nextQuestionButton.classList.remove('hidden')
    instructions.classList.add('hidden');
    quizTitle.classList.add('hidden');
    highscoreButton.classList.add('hidden');
    randomQuestion = questionsArray.sort(() => Math.random() - .5);
    currentQuestion = 0;
    nextQuestion()
    countdown()
}

function countdown() {
    var timeLeft = 10;
    var counter = setInterval(timer, 1000);
    function timer() {
        timeLeft = timeLeft - 1;
        if (timeLeft < 0) {
            clearInterval(counter);
            startButton.classList.remove('hidden');
            questionSection.classList.add('hidden');
            nextQuestionButton.classList.add('hidden');
            timerEl.classList.add('hidden');
            quizTitle.classList.remove('hidden');
                quizTitle.textContent = 'Times Up!';
            instructions.classList.remove('hidden');
                instructions.textContent = 'Your Score Is: '
            highscoreButton.classList.remove('hidden');
            return;
        }
        document.getElementById("timer").innerHTML = timeLeft;
    }
}


function nextQuestion() {
    resetAnswerButtons()
    showQuestion(randomQuestion[currentQuestion])

}

function showQuestion(questionsArray) {
    questionDisplay.innerText = questionsArray.question
    questionsArray.answers.forEach(answers => {
        const button = document.createElement('button')
        button.innerText = answers.text
        button.classList.add('button')
        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', selectedAnswer)
        answerButtons.appendChild(button)
    });
}

function resetAnswerButtons() {
    nextQuestionButton.classList.add('hidden')
    while (answerButtons.firstChild)
        answerButtons.removeChild(answerButtons.firstChild)
}

function selectedAnswer(e) {
    const clickedButton = e.target
    const correct = clickedButton.dataset.correct
    if (randomQuestion.length > currentQuestion + 1) {
        nextQuestionButton.classList.remove('hidden')
    } else {
        startButton.classList.remove('hidden')
        startButton.innerText = 'Restart Quiz'
    }
}