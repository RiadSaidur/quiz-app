const speachReco = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speachReco();
recognition.lang = 'en-GB';

const btn = document.querySelector('.btn');
const answerTrue = document.querySelector('.true');
const answerFalse = document.querySelector('.false');
const result = document.querySelector('.quiz-point');
const quizNumber = document.querySelector('.quiz-nummber');
const restart = document.querySelector('.restart');

let index = 0;
let quizes = [];
let textResult = '';

window.addEventListener('load', loadQuiz);
restart.addEventListener('click', loadQuiz);

if(speachReco){
  btn.addEventListener('click', () => {
    recognition.start();
  });
}
else alert(`Your browser doesn't support voice command`);

recognition.onstart = () => {
  console.log('voice is activated');
  btn.classList.add('animateMic');
}

recognition.onerror = event => {
  console.log(event);
}

recognition.onend = event => {
  console.log(event);
  btn.classList.remove('animateMic');
}

function loadQuiz(){
  const api = `https://opentdb.com/api.php?amount=10&type=boolean`;
  axios.get(api)
  .then(response => {
    quizes = response.data.results; 
    addQuiz();
  })
  console.log('load quiz');
  return;
}

function addQuiz(){
  console.log(quizes);
  nextQuiz(quizes[0]);
  index = 0;
  quizNumber.textContent = ` ${index+1}/10`;
  result.textContent = 0;
  recognition.onresult = event => {
    textResult = event.results[0][0].transcript;
    if(textResult == 'true' || textResult == 'false'){
      if(quizes[index].correct_answer == textResult){
        let point = result.textContent;
        point++;
        result.textContent = point;
      }
      else if(textResult == 'restart'){
        loadQuiz();
        return;
      }
      index++;
      if(index >= 10){
        showResult(result.textContent)
        return;
      }
      nextQuiz(quizes[index]);
      console.log(quizes[index]);
    }
    console.log(result);
    console.log(event);
  }
  answerTrue.addEventListener('click', trueHandle);
  answerFalse.addEventListener('click', falseHandle);
  console.log('add quiz');
}

function nextQuiz(quiz){
  setTimeout(() => {
    document.querySelector('.question').innerHTML = quiz.question;
  }, 1000);
  console.log(quiz);
  return;
}

function showResult(point){
  alert(point);
  return;
}

function trueHandle(){
  if(quizes[index].correct_answer === "True"){
    let point = result.textContent;
    point++;
    result.textContent = ` ${point}`;
  }
  index++;
  if(index >= 10){
    showResult(result.textContent);
    answerTrue.removeEventListener('click', trueHandle);
    answerFalse.removeEventListener('click', falseHandle);
  }
  else{
    nextQuiz(quizes[index]);
    quizNumber.textContent = ` ${index+1}/10`;
  }
  console.log('True Handle');
}

function falseHandle(){
  if(quizes[index].correct_answer === "False"){
    let point = result.textContent;
    point++;
    result.textContent = ` ${point}`;
  }
  index++;
  if(index >= 10){
    showResult(result.textContent);
    answerTrue.removeEventListener('click', trueHandle);
    answerFalse.removeEventListener('click', falseHandle);
  }
  else{
    nextQuiz(quizes[index]);
    quizNumber.textContent = ` ${index+1}/10`;
  }
  
  console.log('False Handle');
}
