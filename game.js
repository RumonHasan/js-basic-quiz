import { questions } from "./quizData.js";
// selectors
const questionContainer = document.querySelector('[data-questionContainer]');
const questionElement = document.querySelector('[data-question]');
const answerButtonsElement = document.querySelectorAll('.answer-button');
const startButtonElement = document.querySelector('[data-startBtn]');
const nextButtonElement = document.querySelector('[data-next]');
const answerContainerElement = document.querySelector('[data-answerContainer]');
const scoreBoardElement = document.querySelector('[data-score]');
// variables
let currentQuestionIndex; // current question 
let jumbledQuestions; // shuffled questions
let score = 0;
const SCORE_INCREASE_RATE = 10;

// listeners 
startButtonElement.addEventListener('click', startGame);
// button for showing the next question index => callback
nextButtonElement.addEventListener('click', ()=>{
    currentQuestionIndex = currentQuestionIndex + 1;
    showNextQuestion();
});

// create score element
function scoreElement(){
    const scoreBoard = document.createElement('div');
    scoreBoard.classList.add('score-number');
    scoreBoard.textContent = score;
    scoreBoardElement.appendChild(scoreBoard)
}

// main start loop 
function startGame(){
    startButtonElement.classList.add('hide'); 
    // getting randomQ between 0 to 2 as there are three objects
    jumbledQuestions = questions.sort(()=> Math.random() - 0.3);
    currentQuestionIndex = 0;
    scoreBoardElement.classList.remove('hide');
    questionContainer.classList.remove('hide');
    showNextQuestion();
}

function showNextQuestion(){    
    // removing the sample elements first
    resetPreExistingElements();
    // passing the first index of the shuffled questions
    displayQuestion(jumbledQuestions[currentQuestionIndex])
}

//main function to display question
function displayQuestion(shuffledQuestion){
    questionElement.textContent = shuffledQuestion.question;
    // populating the answers 
    shuffledQuestion.answers.forEach((answerButton)=>{
        const {option, correct} = answerButton;
        const optionButton = document.createElement('button');
        // adding the required classlist to the options
        optionButton.classList.add('answer-button');
        optionButton.textContent = option;
        // if the answer is correct then adding a dataset to the option button 
        if(correct){
            optionButton.dataset.correct = correct;
        }
        optionButton.addEventListener('click', selectOption);
        answerContainerElement.appendChild(optionButton);
    })
}

// selecting an option
function selectOption(e){
    const optionSelected = e.target;
    const checkOptionDataset = optionSelected.dataset.correct;
    setStatusClass(optionSelected, checkOptionDataset);
    scoreIncrease();
    // coloring all other elements after the selected element
    Array.from(answerContainerElement.children).forEach((button)=>{
        setStatusClass(button, button.dataset.correct);
    })
    if(jumbledQuestions.length > currentQuestionIndex + 1){
        nextButtonElement.classList.remove('hide');
    }else{
        startButtonElement.textContent = 'Restart Game';
        startButtonElement.classList.remove('hide');
    }
}

// score increase
function scoreIncrease(){
     return score += SCORE_INCREASE_RATE;
}

// setting the right and wrong bgs based on the answer
function setStatusClass(element, dataset){
    clearClasses(element);
    if(dataset){
        scoreElement();
        element.classList.add('correct');
    }else{
        element.classList.add('wrong');
    }
}


// clearing pre sample elements from the html page
function resetPreExistingElements(){
    clearClasses(document.body);
    nextButtonElement.classList.add('hide');
    while(scoreBoardElement.firstChild){
        scoreBoardElement.removeChild(scoreBoardElement.firstChild);
    } 
    while(answerContainerElement.firstChild){
        answerContainerElement.removeChild(answerContainerElement.firstChild);
    } // removing the preexisting elements
}

function clearClasses(element){
    // removing all the wrong and correct classes
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// fuck this am not pro... will take me forever to sort problems but am on the right track





