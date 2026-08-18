import { generateNumbers, parseNumbers } from './helper_index.js';


document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#menu');
  const settings = document.querySelector('#settings');
  settings.style.display = 'none';

  let chosen_discipline = ''

  const allButtons = document.querySelectorAll('.card').forEach((button) => {
    button.onclick = () => {
      // alert(button.dataset.discipline)
      settings.style.display = 'block';
      chosen_discipline = button.dataset.discipline;

    }

    settings.querySelector('button').onclick = (event) => {
      event.preventDefault();

      const data = {};
      settings.parentElement.querySelectorAll('input').forEach(input => {
        data[input.name] = input.value;
      })

      // assumes all values are valid
      // TODO: add error handler
      //
      startMemo(chosen_discipline, data);
    }

  });
  document.querySelector('button');


})

function startMemo(name, object) {

  document.querySelector('#menu').style.display = 'none';
  document.querySelector('#settings').style.display = 'none';

  if (name === "spoken_numbers") {

    return;
  }
  console.log("object:", object);
  // TODO: add values from object to a more personalized experience
  const list = generateList(name, parseInt(object.amount));

  // Instance the memo screen
  document.querySelector('body').append(MemoScreen(list))

  console.log(object);

  return;

}

function generateList(type, amount) {
  // TODO: implement each return type
  // by doing fetch in the server
  switch (type) {
    case 'words':
      return ['a', 'b', 'c']
      break;
    case 'cards':
      return ['card1', 'card2', 'card3']
      break;
    case 'names_and_faces':
      return ['name1', 'name2', 'name3']
      break;
    case 'numbers':
      return generateNumbers(amount);
      break;
    case 'abstract_images':
      return ['image1', 'image2', 'image3']
      break;
  }
}

function MemoScreen(list) {
  const next_btn = document.createElement('button');
  const memo = document.createElement('div');
  memo.classList.add('screen');
  next_btn.innerHTML = 'Próximo';

  list.forEach((item) => {
    const element = document.createElement('p');
    element.innerHTML = item;
    memo.append(element);
  });

  next_btn.onclick = () => {
    document.querySelector('body').append(recallScreen(list));
    memo.remove();
  };

  memo.append(next_btn);
  return memo;
}

function recallScreen(list) {
  const recall = document.createElement('div');
  recall.classList.add('screen');

  const input = document.createElement('input');
  const finish_btn = document.createElement('button');
  finish_btn.innerHTML = 'Finalizar';

  finish_btn.onclick = () => {
    const score = computeResult(list, parseNumbers(input.value));
    // TODO: later instead of just one score it will be an object
    // containing all necessary info
    document.querySelector('body').append(resultScreen(score, input.value));
    recall.remove();

  };

  recall.append(input, finish_btn);

  return recall;
}

// TODO: implement valid checking
function computeResult(originalList, userInput) {

  let score = 0;

  for (let i = 0; i < originalList.length; i++) {
    if (originalList[i] === userInput[i]) {
      score++;
    }
  }
  console.log(originalList, userInput)
  console.log(score);

  return score;

}

function resultScreen(score, userInput) {
  const result = document.createElement('div');
  result.classList.add('screen');

  // TODO: add 'send to Discord' button
  // TODO: add 'again' button
  const back_btn = document.createElement('button');
  back_btn.innerHTML = 'Voltar';

  const score_info = document.createElement('h1');
  score_info.style.color = "#fff";
  score_info.innerHTML = score;

  back_btn.onclick = () => {
    // TODO: later instead of just one score it will be an object
    // containing all necessary info

    document.querySelector('#menu').style.display = 'grid';
    document.querySelector('#settings').style.display = 'none';

    result.remove();
  };
  // recall.append(input, finish_btn);

  result.append(score_info, back_btn);

  return result;
}
