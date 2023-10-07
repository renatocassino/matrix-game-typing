export type CustomWindow = Window & typeof globalThis & {
    updateChart: (_data: number[]) => void;
    openScoreModal: () => void;
    gtag: (command: string, targetId: string, event?: unknown) => void;
}
