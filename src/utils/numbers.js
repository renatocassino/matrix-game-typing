export function generateRandom(min, max) {
  return min + Math.random() * (max - min);
}

export function generateRandomInteger(min, max) {
  return Math.floor(generateRandom(min, max));
}

export function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

export function easeOutQuad(t) {
  return 1 - (1 - t) * (1 - t);
}

export function easeOutSmooth(t) {
  const quad = 1 - (1 - t) ** 2;
  return 0.5 * quad + 0.5 * t;
}

export function calculateDurationWord(baseDuration, word) {
  const extraDurationPerChar = 50;
  const baseCharCount = 1;

  const extraChars = Math.max(0, word.length - baseCharCount);
  return baseDuration + extraDurationPerChar * extraChars;
}

export function formatTime(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
