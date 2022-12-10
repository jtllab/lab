
//枚举，enum类型,其中每个值都是上一个值+1,用于控制游戏状态
export enum GameState{
    GameReady = 0,
    GamePlaying,
    GameOver
}


export class GameStatus  {

    // 注意要加static 
  
    // 设置游戏状态变量gamestate
    public static gamestate: GameState = GameState.GameReady;

    // 获取游戏状态
    public static getGameState(){
        
        return this.gamestate;
    }

    //设置gamestate状态为game reday
    public static setGameStateRedey(){

        this.gamestate = GameState.GameReady;

    }

    //设置gamestate状态为game play
    public static setGameStatePlay(){

        this.gamestate = GameState.GamePlaying;
        
    }

    //设置gamestate状态为game over
    public static setGameStateOver(){

        this.gamestate = GameState.GameOver;
        
    }

    
}





