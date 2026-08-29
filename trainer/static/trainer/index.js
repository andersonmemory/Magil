import { shuffleArray, chooseParser, generateNamesAndFaces, generateCards, generateImages, generateWords, generateNumbers, parseNumbers, playSpokenNumbers } from './helper_index.js';


document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#menu');
  const settings = document.querySelector('#settings');
  settings.style.display = 'none';

  const switchCategoryBtn = document.querySelector('#switch-category-btn');
  let currentCategory = 'memory'

  switchCategoryBtn.onclick(() => {
    if (currentCategory === 'memory') {
      menu.style.display = 'none';
      if (settings.style.display === 'block') {
        settings.style.display = 'none';
      };

      // TODO: make the mental calc screen appearing

    } else if (currentCategory === 'mental_math') {
      menu.style.display = 'block';
    };

  });

  let chosen_discipline = '';

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
    case 'cards':
      return generateCards(amount);
    case 'names-and-faces':
      return await generateNamesAndFaces(amount);
    case 'numbers':
      return generateNumbers(amount);
    case 'spoken-numbers':
      return generateNumbers(amount);
    case 'images':
      return await generateImages(amount);
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
  } else if (['images', 'cards'].includes(name)) {
    // TODO: CSS will turn into a grid
    memo.classList.add('screen')
    console.log(list);
    list.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      console.log(img);
      memo.append(img);
    });
  } else if (name === 'names-and-faces') {
    // TODO: CSS will turn into a grid
    memo.classList.add('screen')
    console.log(list);
    list.forEach((object) => {
      // individual 'names-and-faces' container
      const div = document.createElement('div');
      const img = document.createElement('img');
      const name = document.createElement('p');
      name.style.display = 'block';
      name.style.textAlign = 'center';

      img.src = object["picture"];
      name.innerHTML = `${object["first"]} ${object["last"]}`;

      div.append(img, name)

      memo.append(div);
      console.log(div);
    });

  } else {
    list.forEach((item) => {
      const element = document.createElement('p');
      element.innerHTML = item;
      memo.append(element);
    });
  }

  // TODO: add try/catch (async arrow functions may break interface if gone wrong)
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

  if (['images', 'cards'].includes(name)) {

    recall.style.display = 'grid';
    recall.style.gridTemplateColumns = "400px 400px 200px";

    const [placedSequence, availableImages] = FieldScreen(list);


    inputSpace = placedSequence;

    recall.append(placedSequence, availableImages);

  } else if (name === 'names-and-faces') {


    recall.style.display = 'grid';
    recall.style.gridTemplateColumns = "200px 200px 200px";
    recall.style.gap = '20px';

    recall.append(...ImageInputFieldScreen(list));

  } else {

    inputSpace = document.createElement('input');
    inputSpace.onkeyup = () => {
      inputValue = inputSpace.value;
    }

  };

  const parser = chooseParser(name);

  finishButton.onclick = async () => {

    // if its any discipline that use clickable items (e.g.: cards or images)
    if (document.querySelector('#placed-sequence')) {
      inputValue = [];
      [...document.querySelector('#placed-sequence').children].forEach((item) => {
        inputValue.push(item.getAttribute('src'));
      });
    }
    // or any discipline which correlates images to input fields (e.g.: names-and-faces)
    else if (document.querySelector('.fillfield-card')) {
      const allFields = document.querySelectorAll('.fillfield-card');
      inputValue = [];
      allFields.forEach((fieldCard) => {
        const img = fieldCard.previousElementSibling.src;
        const first = fieldCard.children[0].value;
        const last = fieldCard.children[1].value;
        inputValue.push({ first: first, last: last, picture: img });
      });

    };

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

  // in case we're dealing with objects
  if ((typeof originalList === 'object') && (typeof userInput === 'object')) {
    for (let i = 0; i < originalList.length; i++) {
      if (originalList[i]["first"] === userInput[i]["first"]) {
        score++;
      };
      if (originalList[i]["second"] === userInput[i]["second"]) {
        score++;
      };
    }
  } else {
    for (let i = 0; i < originalList.length; i++) {
      if (originalList[i] === userInput[i]) {
        score++;
      }
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

/**
 * Instance a Screen made for clickable items to retrieve
 * a set of images such as in Cards and Images discipline
 * @param {*} list 
 * @param {*} inputValue 
 * @returns 
 */
function FieldScreen(list) {

  const randomized = shuffleArray(list);
  const placedSequence = document.createElement('div');
  placedSequence.id = 'placed-sequence';
  placedSequence.style.border = '1px solid green';

  // inputSpace = document.createElement('input');
  // inputSpace = placedSequence;

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
    };
  })
  return [placedSequence, availableImages];
}


/**
 * returns a Screen made for items which associate images to text to retrieve
 * a set of corresponding values such as in Names and Faces discipline
 * @param {*} list 
 * @param {*} inputValue 
 * @returns 
 */
function ImageInputFieldScreen(list) {

  const randomized = shuffleArray(list);
  const elements = [];

  randomized.forEach((object) => {
    // instancing
    // individual 'names-and-faces' container
    const div = document.createElement('div');
    div.id = ''
    div.style.textAlign = 'center';

    // the actual picture
    const img = document.createElement('img');
    img.src = object.picture;

    // where input boxes are located
    const inputFields = document.createElement('div');

    // gives an unique id for future assignments to inputValue
    inputFields.className = 'fillfield-card';

    // user's input boxes - if more similar disciplines does exist, this can be changed
    // these fields are empty in the beginning
    const first = document.createElement('input');
    const last = document.createElement('input');

    first.type = 'text';
    last.type = 'text';

    inputFields.append(first, last);
    div.append(img, inputFields);

    elements.push(div);
  })

  return elements;
}
