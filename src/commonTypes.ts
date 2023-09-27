export type CustomWindow = Window & typeof globalThis & {
    updateChart: (data: number[]) => void;
    openScoreModal: () => void;
}