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
  const sequence = []
  for (let i = 0; i < amount; i++) {
    sequence.push(Math.floor(Math.random() * 10))
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
    case 'words':
      return parseWords;
      break;
  }

};
