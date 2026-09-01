const operation = {
  addition: (i, j) => i + j,
  subtraction: (i, j) => i - j,
  multiplication: (i, j) => i * j,
  division: (i, j) => i / j
}

/**
 * Creates the screen used in the calculation phase
 * 
 */
export function CalcScreen(operator) {

  // TODO: the operator should change according to the parameter's value
  console.log("Operator is: " + operator);

  const symbol = { addition: '+', subtraction: '-', multiplication: '*', division: '/' };

  const panel = document.createElement('div');

  const question = document.createElement('p');

  const answer = document.createElement('input');
  answer.type = 'text';
  answer.placeHolder = 'Insira sua resposta';

  let calculateObj = calculate(operator);
  let result = calculateObj.result;
  question.innerHTML = `${calculateObj.first} ${symbol[operator]} ${calculateObj.second}?`;

  answer.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
      console.log('pressedEnter')
      // TODO:: add handler for proper input
      // it assumes for now that it'll always be an valid integer

      let userAnswer = parseInt(answer.value);
      console.log("UserAnswer is: " + userAnswer);
      console.log("Result is: " + result);

      if (userAnswer === result) {
        // repetition here
        let { result: newResult, first, second } = calculate(operator);
        result = newResult;
        question.innerHTML = `${first} ${symbol[operator]} ${second}?`;

      }
    }
  });

  panel.append(question, answer);
  return panel;

}

// TODO: parameters size can be set for first and second
function calculate(operator) {
  const first = Math.floor(Math.random() * 10) + 1;
  const second = Math.floor(Math.random() * 10) + 1;

  return { result: operation[operator](first, second), first: first, second: second };
};
