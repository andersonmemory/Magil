/**
 * Create a number sequence based on its amount
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
 * Normalize input to work with the numbers discipline
 * @param {*} sequence
 */
export function parseNumbers(sequence) {
  const new_sequence = [];
  for (let i = 0; i < sequence.length; i++) {
    new_sequence.push(parseInt(sequence[i]));
  }
  return new_sequence;
};
