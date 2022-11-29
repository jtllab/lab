export class GameState {
    public score: number = 0;
    private static _instance: GameState;
    public static getInstance(): GameState {
        if (!GameState._instance) {
            GameState._instance = new GameState();
        }

        return GameState._instance;
    }
}
