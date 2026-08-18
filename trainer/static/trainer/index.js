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
      startMemo({ chosen_discipline, data });
    }

  });
  document.querySelector('button');


})

function startMemo({ name, object }) {

  document.querySelector('#menu').style.display = 'none';
  document.querySelector('#settings').style.display = 'none';

  if (name === "spoken_numbers") {

    return;
  }

  // TODO: add values from object to a more personalized experience
  list = generateList(name)

  // Instance the memo screen
  document.querySelector('body').append(MemoScreen(list))

  console.log(object);

  return;

}

function generateList(type) {
  // TODO: implement each return type
  // by doing fetch in the server
  switch (type) {
    case type === "words":
      return ['a', 'b', 'c']
      break;
    case type === "cards":
      return ['card1', 'card2', 'card3']
      break;
    case type === "names_and_faces":
      return ['name1', 'name2', 'name3']
      break;
    case type === "numbers":
      return ['1', '2', '3']
      break;
    case type === "abstract_images":
      return ['image1', 'image2', 'image3']
      break;
  }
}

function MemoScreen(list) {
  const memo = document.createElement('div');
  memo.classList.add('screen')

  list.forEach((item) => {
    const element = document.createElement('p');
    element.innerHTML = item;
    memo.append(element)
  });

  return memo;
}
