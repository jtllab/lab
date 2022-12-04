
//枚举，enum类型,其中每个值都是上一个值+1,用于控制游戏状态
export enum GameState{
    GameReady = 0,
    GamePlaying,
    GameOver
}


export class GameStatus  {

  

    public static gamestate: GameState = GameState.GameReady;

    public static getGameState(){

        return this.gamestate;
    }

    public static setGameStateRedey(){

        this.gamestate = GameState.GameReady;

    }

    public static setGameStatePlay(){

        this.gamestate = GameState.GamePlaying;
        
    }

    public static setGameStateOver(){

        this.gamestate = GameState.GameOver;
        
    }

    
}





