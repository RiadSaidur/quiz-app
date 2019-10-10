const btn = document.querySelector('.btn');
const answerTrue = document.querySelector('.true');
const answerFalse = document.querySelector('.false');
const result = document.querySelector('.quiz-point');
const quizNumber = document.querySelector('.quiz-nummber');
const restart = document.querySelector('.restart');

let index = 0;
let quizes = [];

window.addEventListener('load', loadQuiz);
restart.addEventListener('click', () => {
  location.reload(true);
});

function loadQuiz(){
  const api = `https://opentdb.com/api.php?amount=10&type=boolean`;
  axios.get(api)
  .then(response => {
    quizes = response.data.results; 
    addQuiz();
  })
  return;
}

function addQuiz(){
  nextQuiz(quizes[index]);
  quizNumber.innerHTML = ` ${index+1}/10`;
  result.innerHTML = 0;
  
  answerTrue.addEventListener('click', trueHandle);
  answerFalse.addEventListener('click', falseHandle);
}

function nextQuiz(quiz){
  setTimeout(() => {
    document.querySelector('.question').innerHTML = quiz.question;
  }, 1000);
  return;
}

function showResult(point){
  alert(point);
  return;
}

function trueHandle(){
  if(quizes[index].correct_answer === "True"){
    let point = result.innerHTML;
    point++;
    result.innerHTML = ` ${point}`;
  }
  index++;
  if(index >= 10){
    showResult(result.innerHTML);
    answerTrue.removeEventListener('click', trueHandle);
    answerFalse.removeEventListener('click', falseHandle);
  }
  else{
    nextQuiz(quizes[index]);
    quizNumber.innerHTML = ` ${index+1}/10`;
  }
}

function falseHandle(){
  if(quizes[index].correct_answer === "False"){
    let point = result.innerHTML;
    point++;
    result.innerHTML = ` ${point}`;
  }
  index++;
  if(index >= 10){
    showResult(result.innerHTML);
    answerTrue.removeEventListener('click', trueHandle);
    answerFalse.removeEventListener('click', falseHandle);
  }
  else{
    nextQuiz(quizes[index]);
    quizNumber.innerHTML = ` ${index+1}/10`;
  }
}
