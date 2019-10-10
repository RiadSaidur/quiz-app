const speachReco = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speachReco();

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
restart.addEventListener('click', () => {
  location.reload(true);
});

if (speachReco) {
  btn.addEventListener('click', () => {
    recognition.start();
  });
}
else alert(`Your browser doesn't support voice command`);

recognition.onstart = (event) => {
  console.log(event);
  btn.classList.add('animateMic');
}

recognition.onerror = event => {
  alert(event.error);
}

recognition.onend = (event) => {
  console.log(event);
  btn.classList.remove('animateMic');
}

function loadQuiz() {
  const api = `https://opentdb.com/api.php?amount=10&type=boolean`;
  axios.get(api)
    .then(response => {
      quizes = response.data.results;
      addQuiz();
    })
  return;
}

recognition.onresult = event => {
  console.log(`Event: ${event}`);
  textResult = event.results[0][0].transcript;
  textResult = textResult.charAt(0).toUpperCase() + textResult.slice(1);
  console.log(`textResult: ${textResult}`);
  if (textResult == 'True' || textResult == 'False') {

    quizNumber.innerHTML = ` ${index + 1}/10`;
    console.log(`true/false catched`);
    if (quizes[index].correct_answer == textResult) {
      let point = result.innerHTML;
      point++;
      result.innerHTML = point;

    }

    else alert('Sorry, please try again');
    index++;
    if (index >= 10) {
      showResult(result.innerHTML)
      return;
    }
    nextQuiz(quizes[index]);
  }
  else if (textResult == 'Restart') {
    location.reload(true);
  }
}

function addQuiz() {
  nextQuiz(quizes[index]);
  quizNumber.innerHTML = ` ${index + 1}/10`;
  result.innerHTML = 0;

  answerTrue.addEventListener('click', trueHandle);
  answerFalse.addEventListener('click', falseHandle);
}

function nextQuiz(quiz) {
  setTimeout(() => {
    document.querySelector('.question').innerHTML = quiz.question;
  }, 1000);
  return;
}

function showResult(point) {
  alert(point);
  return;
}

function trueHandle() {
  if (quizes[index].correct_answer === "True") {
    let point = result.innerHTML;
    point++;
    result.innerHTML = ` ${point}`;
  }
  index++;
  if (index >= 10) {
    showResult(result.innerHTML);
    answerTrue.removeEventListener('click', trueHandle);
    answerFalse.removeEventListener('click', falseHandle);
  }
  else {
    nextQuiz(quizes[index]);
    quizNumber.innerHTML = ` ${index + 1}/10`;
  }
}

function falseHandle() {
  if (quizes[index].correct_answer === "False") {
    let point = result.innerHTML;
    point++;
    result.innerHTML = ` ${point}`;
  }
  index++;
  if (index >= 10) {
    showResult(result.innerHTML);
    answerTrue.removeEventListener('click', trueHandle);
    answerFalse.removeEventListener('click', falseHandle);
  }
  else {
    nextQuiz(quizes[index]);
    quizNumber.innerHTML = ` ${index + 1}/10`;
  }
}
