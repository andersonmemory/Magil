/**
 * Creates a word sequence based on its amount
 * @param {*} amount
 */
export async function generateWords(amount) {
  const words = await fetch(`https://random-word-api.herokuapp.com/word?number=${amount}&lang=pt-br`)
    .then(response => { return response.json(); })
    .then(data => {
      console.log(data);
      return data;
    })
  return words;
};

/**
 * Creates a number sequence based on its amount
 * @param {*} amount
 */
export function generateNumbers(amount) {
  const sequence = [];
  for (let i = 0; i < amount; i++) {
    sequence.push(Math.floor(Math.random() * 10))
  }
  return sequence;
}

/**
 * Creates an image sequence based on its amount
 * @param {*} amount
 */
// TODO: use different API or make my own to avoid overusing their API
export async function generateImages(amount) {
  const sequence = [];
  for (let i = 0; i < amount; i++) {
    sequence.push(`https://picsum.photos/seed/${Date.now()}_${i}/200/200`);
  }
  return sequence;
}

/**
 * Normalizes input to work with the numbers discipline
 * @param {*} sequence
 */
export function parseNumbers(sequence) {
  const new_sequence = [];
  for (let i = 0; i < sequence.length; i++) {
    new_sequence.push(parseInt(sequence[i]));
  }
  return new_sequence;
};

/**
 * Normalizes input to work with the words discipline
 * @param {*} sequence
 */
export function parseWords(sequence) {
  return sequence.split(' ');
};


/**
 * Returns the right parser function according to the discipline name
 * @param {*} discipline
 */
export function chooseParser(discipline) {

  switch (discipline) {
    case 'numbers':
      return parseNumbers;
      break;
    case 'spoken-numbers':
      return parseNumbers;
      break;
    case 'words':
      return parseWords;
      break;
    // When parsing is not needed at all
    default:
      return (inputSequence) => { return inputSequence };
      break;

  }

};

/**
 * Async helper for dealing with the waiting mechanism for SpokenNumbers
 * @param {*} sequence
 */
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

}

/**
 * Async helper for handling the waiting mechanism for SpokenNumbers
 * @param {*} sequence
 */
function playAndWait(audio) {

  return new Promise((resolve) => {
    audio.play();
    audio.addEventListener('ended', resolve);
  });

}

/**
 * Say numbers out loudly from a given sequence
 * @param {*} sequence
 */
export async function playSpokenNumbers(sequence) {

  const audioPaths = JSON.parse(document.querySelector('#audio-paths').textContent);
  const audioList = [];

  audioPaths.forEach((item) => {
    audioList.push(new Audio(item));
  });

  for (let i = 0; i < sequence.length; i++) {
    await playAndWait(audioList[sequence[i]]);
    // TODO: eliminate hardcode and allow dynamic customization from user
    await wait(1000);

  };
}

/**
 * Shuffle a sequence of elements randomly and returns a new array
 * @param {*} sequence
 */
export function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
