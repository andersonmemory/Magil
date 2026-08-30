
const MATH_OPERATORS = ["adição", "subtração", "multiplicação", "divisão"]

function mathInitialScreen() {

  // TODO: Finish implementation
  const mathScreen = document.createElement('div');
  mathScreen.style.display = 'grid';


  // TODO: remove manual implementation and use iterative approach
  sumBtn = document.createElement('button');
  sumBtn.innerHTML = "addition";

  sumBtn.onclick = () => {
    mathScreen.append(CalcScreen());
  };

  mathScreen.append(sumBtn);


  // TODO: complete implementation with chooseOperator
  // MATH_OPERATORS.forEach((operator) => {
  //
  // })

  // HTMLElement
  return mathScreen;

}

/**
 * Creates the screen used in the calculation phase
 * 
 */
function CalcScreen() {

}

function chooseOperator(operator) {
  // TODO: use hashmap to apply the strategy pattern
  return
};
