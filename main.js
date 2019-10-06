window.addEventListener('load', loadQuiz);

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
  let index = 0;
  nextQuiz(quizes[0]);
  answerTrue.addEventListener('click', () => {
    if(quizes[index].correct_answer === "True"){
      let point = result.textContent;
      point++;
      result.textContent = point;
    }
    index++;
    if(index >= 10){
      showResult(result.textContent)
      return;
    }
    nextQuiz(quizes[index]);
  });
  answerFalse.addEventListener('click', () => {
    if(quizes[index].correct_answer === "False"){
      let point = result.textContent;
      point++;
      result.textContent = point;
    }
    index++;
    if(index >= 10){
      showResult(result.textContent)
      return;
    }
    nextQuiz(quizes[index]);
    console.log(quizes[index]);
  });
}

function nextQuiz(quiz){
  document.querySelector('.question').textContent = quiz.question;
  console.log(quiz);
}

function showResult(point){
  alert(point);
}