/** @type {import('./string').asPercentage} */
export function asPercentage(value) {
  return ''.concat(Math.floor(value * 100), '%');
}
