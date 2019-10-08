const btn = document.querySelector('.btn');
const restart = document.querySelector('.restart');
const speachReco = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speachReco();
recognition.lang = 'en-GB';

window.addEventListener('load', loadQuiz);
restart.addEventListener('click', loadQuiz);

if(speachReco){
  btn.addEventListener('click', () => {
    recognition.start();
  });
}
else console.log('sucks');

recognition.onstart = () => {
  console.log('voice is activated');
}

recognition.onerror = event => {
  console.log(event);
}

recognition.onend = event => {
  console.log(event);
}

function loadQuiz(){
  const api = `https://opentdb.com/api.php?amount=10&type=boolean`;
  axios.get(api)
  .then(response => {
    addQuiz(response.data.results);
  })
}

function addQuiz(quizes){
  console.log(quizes);
  const answerTrue = document.querySelector('.true');
  const answerFalse = document.querySelector('.false');
  const result = document.querySelector('.quiz-point');
  const quizNumber = document.querySelector('.quiz-nummber');
  let index = 0;
  nextQuiz(quizes[0]);
  quizNumber.textContent = ` ${index+1}/10`;
  recognition.onresult = event => {
    const result = event.results[0][0].transcript;
    if(result == 'true' || result == 'false'){
      if(quizes[index].correct_answer == result){
        let point = result.textContent;
        point++;
        result.textContent = point;
      }
      else if(result == 'restart'){
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
    return;
  }

  answerTrue.addEventListener('click', () => {
    if(quizes[index].correct_answer === "True"){
      let point = result.textContent;
      point++;
      result.textContent = ` ${point}`;
    }
    index++;
    if(index >= 10){
      showResult(result.textContent)
      return;
    }
    nextQuiz(quizes[index]);
    quizNumber.textContent = ` ${index+1}/10`;
  });
  answerFalse.addEventListener('click', () => {
    if(quizes[index].correct_answer === "False"){
      let point = result.textContent;
      point++;
      result.textContent = ` ${point}`;
    }
    index++;
    if(index >= 10){
      showResult(result.textContent)
      return;
    }
    nextQuiz(quizes[index]);
    quizNumber.textContent = ` ${index+1}/10`;
    console.log(quizes[index]);
  });
}

function nextQuiz(quiz){
  setTimeout(() => {
    document.querySelector('.question').innerHTML = quiz.question;
  }, 1000);
  console.log(quiz);
}

function showResult(point){
  alert(point);
}