
(function(){
function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    //for each question
    myQuestions.forEach(
        (currentQuestion,questionNumber) => {

            //to store the possible answers list
            const answers = [];

            //for each available answer
            for(letter in currentQuestion.answers){

                //add HTML radio button

                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value= "${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            //add this question and answers to the output
            output.push(
                `<div class="slide">
                <div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join("")} </div>
                </div>`
            );

         }
    );
    //combine output list into one string of HTML
    quizContainer.innerHTML = output.join('');
}

function showResults(){
    //gather answer container from quiz
   const answerContainers = quizContainer.querySelectorAll('.answers');
    //keep track of users answer
    let numCorrect = 0;

    //for each question
    myQuestions.forEach( (currentQuestion, questionNumber) =>
    {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      
        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;

            answerContainers[questionNumber].style.color = 'blue';

        }
        else {
            answerContainers[questionNumber].style.color = 'red';

        }
    });
     // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
        previousButton.style.display = 'none';
    }
    else{
        previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display ='none';
    }
}

function showNextSlide(){
    showSlide(currentSlide + 1);
}

function showPreviousSlide(){
    showSlide(currentSlide - 1);
}


const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
        question: "HTML stands for?",
        answers: {
            a: "HyperText Markup Language" ,
            b: "HyperText Module Language" ,
            c: "HyperTest Module Language"
        },
        correctAnswer: "a"
    },
    {
        question: "A page designed in HTML is called?",
        answers: {
            a: "Application" ,
            b: "front-end" ,
            c: "Web page"
        },
        correctAnswer: "c"
    },
    {
        question: "Choose the correct HTML tag for a large title" ,
        answers: {
            a: "h1" ,
            b: "Head" ,
            c: "h6"
        },
        correctAnswer: "a"
    },
    {
        question: "CSS stands for ?" ,
        answers: {
            a: "Colourful Style Sheets" ,
            b: "Cascading Style Sheets" ,
            c: "Creative Style Sheets"
         },
         correctAnswer: "b"
    },
    {
        question: "CSS selector to style the element with id named 'car'?" ,
        answers: {
            a: ".car" ,
            b: "$car" ,
            c: "#car"
        },
        correctAnswer: "c"
    }
];

buildQuiz();
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener("click",showResults);
previousButton.addEventListener("click",showPreviousSlide);
nextButton.addEventListener("click",showNextSlide);

})();

