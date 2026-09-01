/**
 * Creates the screen used in the calculation phase
 * 
 */
export function CalcScreen(operator) {

  // TODO: the operator should change according to the parameter's value
  console.log("Operator is: " + operator);

  const panel = document.createElement('div');

  const question = document.createElement('p');

  const answer = document.createElement('input');
  answer.type = 'text';
  answer.placeHolder = 'Insira sua resposta';


  //  TODO:: apply DRY and remove repetition
  let additionObj = addition();
  let result = additionObj.first + additionObj.second;
  question.innerHTML = `${additionObj.first} + ${additionObj.second}?`;

  answer.addEventListener('keyDown', (event) => {

    if (event.key === 'Enter') {
      // console.log('pressedEnter')
      // TODO:: add handler for proper input
      // it assumes for now that it'll always be an valid integer
      userAnswer = parseInt(answer.value)

      if (userAnswer === result) {
        // repetition here
        const { first, second } = addition();
        result = additionObj.first + additionObj.second;
        question.innerHTML = `${first} + ${second}?`;

      }
    }
  });

  panel.append(question, answer);
  return panel;

}


function addition() {

  const question = {
    first: Math.floor(Math.random() * 10) + 1,
    second: Math.floor(Math.random() * 10) + 1
  };

  return question;
}
//
//
// function chooseOperator(operator) {
//   // TODO: use hashmap to apply the strategy pattern
//   return
// };
