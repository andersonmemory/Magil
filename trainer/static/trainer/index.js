import { shuffleArray, chooseParser, generateImages, generateWords, generateNumbers, parseNumbers, playSpokenNumbers } from './helper_index.js';


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
})

async function startMemo(name, object) {

  document.querySelector('#menu').style.display = 'none';
  document.querySelector('#settings').style.display = 'none';

  // if (name === "spoken-numbers") {
  //
  //   return;
  // }
  console.log("object:", object);
  // TODO: add values from object to a more personalized experience
  const waiting_message = document.createElement('h1');
  waiting_message.innerHTML = "Gerando a sequência, aguarde...";
  waiting_message.style.color = '#fff';
  document.querySelector('body').append(waiting_message);
  const list = await generateList(name, parseInt(object.amount));
  waiting_message.remove();

  // Instance the memo screen
  await MemoScreen(name, list);

  console.log(object);

  return;

}

async function generateList(type, amount) {
  // TODO: implement each return type
  // by doing fetch in the server
  switch (type) {
    case 'words':
      return await generateWords(amount);
      break;
    case 'cards':
      return ['card1', 'card2', 'card3'];
      break;
    case 'names-and-faces':
      return ['name1', 'name2', 'name3'];
      break;
    case 'numbers':
      return generateNumbers(amount);
      break;
    case 'spoken-numbers':
      return generateNumbers(amount);
      break;
    case 'images':
      return await generateImages(amount);
      break;
  }
}

async function MemoScreen(name, list) {
  const next_btn = document.createElement('button');
  const memo = document.createElement('div');
  memo.classList.add('screen');
  next_btn.innerHTML = 'Próximo';
  document.querySelector('body').append(memo);
  if (name === 'spoken-numbers') {
    // TODO: add proper icon as an svg instead of this emoji
    const sound_icon = document.createElement('p');
    sound_icon.innerHTML = '🎧'
    sound_icon.style.fontSize = '150px';
    sound_icon.style.textAlign = 'center';
    sound_icon.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    sound_icon.style.borderRadius = '100px';
    sound_icon.style.margin = '30px';
    sound_icon.style.padding = '30px';
    sound_icon.style.backdropFilter = 'blur(10px)';
    memo.append(sound_icon);
    // document.querySelector('body').append(memo);
    await playSpokenNumbers(list);
  } else if (name === 'images') {
    // TODO: CSS will turn into a grid
    memo.classList.add('images-screen')
    console.log(list);
    list.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      console.log(img);
      memo.append(img);
    });
    //
    // list.forEach((item) => {
    //   const element = document.createElement('p');
    //   element.innerHTML = item;
    //   memo.append(element);
    // });
    //
  } else {
    list.forEach((item) => {
      const element = document.createElement('p');
      element.innerHTML = item;
      memo.append(element);
    });
  }

  next_btn.onclick = async () => {
    document.querySelector('body').append(await recallScreen(name, list));
    memo.remove();
  };

  memo.append(next_btn);
}

async function recallScreen(name, list) {
  const recall = document.createElement('div');

  let inputValue;
  let inputSpace;
  let finishButton = document.createElement('button');
  finishButton.innerHTML = 'Finalizar';

  // recall.classList.add('screen');

  if (name === 'images') {

    recall.style.display = 'grid';
    recall.style.gridTemplateColumns = "200px 200px 200px";

    const randomized = shuffleArray(list);
    const placedSequence = document.createElement('div');
    placedSequence.id = 'placed-sequence';
    placedSequence.style.border = '1px solid green';

    // inputSpace = document.createElement('input');
    inputSpace = placedSequence;

    const availableImages = document.createElement('div');
    availableImages.id = 'available-images';
    availableImages.style.border = "1px solid blue";

    randomized.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.style.cursor = 'pointer';
      img.style.display = 'block';

      availableImages.append(img);

      img.onclick = () => {
        const place = document.querySelector('#placed-sequence');
        const tray = document.querySelector('#available-images');

        if (img.parentElement === place) {
          tray.appendChild(img);
        } else if (img.parentElement === tray) {
          place.appendChild(img);
        }

        // WARNING: this might not be the best approach since it resets on every change
        // TODO: find a better approach or remove this TODO if it's not compute intensive
        inputValue = [];
        [...place.children].forEach((item) => {
          inputValue.push(item.src)
        });
      };
    })

    recall.append(placedSequence, availableImages);

  } else {

    inputSpace = document.createElement('input');
    inputSpace.onkeyup = () => {
      inputValue = inputSpace.value;
    }

  };

  const parser = chooseParser(name);

  finishButton.onclick = async () => {
    const score = computeResult(list, parser(inputValue));
    // TODO: later instead of just one score it will be an object
    // containing all necessary info
    document.querySelector('body').append(resultScreen(score));
    recall.remove();
  };

  recall.append(inputSpace, finishButton);

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

function resultScreen(score) {
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
