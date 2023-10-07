export type CustomWindow = Window & typeof globalThis & {
    updateChart: (_data: number[]) => void;
    openScoreModal: () => void;
    openAdModal: () => void;
    gtag: (command: string, targetId: string, event?: unknown) => void;
    adsbygoogle: unknown[];
}
