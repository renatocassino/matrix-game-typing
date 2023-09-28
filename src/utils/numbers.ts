export function generateRandomInteger(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min + 1))
}

export function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

export function easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t);
}

export function easeOutSmooth(t: number): number {
    const quad = 1 - Math.pow(1 - t, 2);
    return 0.5 * quad + 0.5 * t;
}

export function calculateDurationWord(baseDuration: number, word: string): number {
    const extraDurationPerChar = 50;
    const baseCharCount = 1;

    let extraChars = Math.max(0, word.length - baseCharCount);
    return baseDuration + (extraDurationPerChar * extraChars);
}