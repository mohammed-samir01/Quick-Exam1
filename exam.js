userName         = document.getElementById('userName');
UserNameCookie   = document.cookie.split(" ")[0].split("=")[1];
quizTimer        = document.getElementById('QuizTimer');
question         = document.getElementById('question');
choices          = document.getElementsByClassName('choice-text');
progressText     = document.getElementById('progressText');
scoreText        = document.getElementById('score');
progressBarFull  = document.getElementById('progressBarFull');
PrevButton       = document.getElementById('Prev');
NextButton       = document.getElementById('Next');
FinishButton     = document.getElementById('Finish');

// UserNameCookie

userName.innerText = `Welcome  : ${UserNameCookie}`;

// Exam Timer

const  startingMinutes = 30;
let time = startingMinutes * 60;
setInterval(updateCountDown,1000);

function updateCountDown (){
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds ;

        quizTimer.innerHTML = `${minutes} : ${seconds}`;
        time--;
        if (minutes == 0){
            window.location.assign("login.html")
        }
}

let currentQuestion ={};
let acceptingAnswers = false;
let score = 0;
let questionCounter =0;
let availableQuestions =[];
let questions = [];
let questionIndex=0;


fetch("questions.json")
    .then(res => {
            return  res.json();
    })
    .then(loadedQuestions => {
            questions = loadedQuestions;
            startExam();
    })
    .catch(err => {
            console.error(err);
    })

const Correct_Bonus = 10;
const Max_Question  = 10;


NextButton.addEventListener('click',function (){

        progressText.innerText = ` Question ${questionCounter}/${Max_Question}`;
        progressBarFull.style.width = `${(questionCounter/Max_Question) * 100}%`;

        if(questionCounter == 10){
                NextButton.style.display = "none";
                FinishButton.style.display = "inline-block";


        }

        FinishButton.addEventListener('click',function (){
                window.location.assign("end.html");
        })

        let header = questions[questionCounter ];

        question.innerText = header.question;

        for (let i = 0; i <choices.length ; i++) {
                const number = choices[i].dataset['number'];
                choices[i].innerText = header['choice' + number];
                acceptingAnswers = true;
        }

        questionCounter++;
})

PrevButton.addEventListener('click',function (){

        if (questionCounter === 1){

                questionCounter = questionCounter;

        }else {

                let header = questions[questionCounter -2 ];

                question.innerText = header.question;

                for (let i = 0; i <choices.length ; i++) {
                        const number = choices[i].dataset['number'];
                        choices[i].innerText = header['choice' + number];
                        acceptingAnswers = true;
                }
                progressText.innerText = ` Question ${questionCounter -2 }/${Max_Question}`;
                progressBarFull.style.width = `${((questionCounter -2)/Max_Question) * 100}%`;

                questionCounter--;
        }

})

startExam = () => {

        questionCounter = 1;
        score = 0;
        availableQuestions = [...questions];
        getNewQuestion();
};

getNewQuestion = () => {

        if (availableQuestions.length === 0 || questionCounter > Max_Question){

                localStorage.setItem('mostRecentScore',score);

                return window.location.assign("end.html");
        }

        if(questionCounter == 10){
                NextButton.style.display = "none";
                FinishButton.style.display = "block";


        }
        FinishButton.addEventListener('click',function (){
                window.location.assign("end.html");
        })

        progressText.innerText = ` Question ${questionCounter}/${Max_Question}`;
        progressBarFull.style.width = `${(questionCounter/Max_Question) * 100}%`;
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        for (let i = 0; i <choices.length ; i++) {
                const number = choices[i].dataset['number'];
                choices[i].innerText = currentQuestion['choice' + number];
                acceptingAnswers = true;
        }
        questionCounter++;
        questionIndex++;

};

for (let i = 0; i < choices.length; i++) {

        choices[i].addEventListener('click',(e) => {
                // console.log(e.target);
                if (!acceptingAnswers) return;

                acceptingAnswers = false;
                const selectedChoice = e.target;
                const selectedAnswer = selectedChoice.dataset['number'];

                let classToApply = 'incorrect';

                if(selectedAnswer == currentQuestion.answer) {

                        classToApply = 'correct';

                }

                if(classToApply === "correct"){

                        incrementScore(Correct_Bonus);
                }
                        getNewQuestion();
        });
}


incrementScore = (num) => {
        score += num;
}


// scoreText.innerText =score;


