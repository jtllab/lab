//枚举，enum类型,其中每个值都是上一个值+1,用于控制游戏状态
export enum GameState{
    Login = 0, 
    Ready,  //准备
    Playing,     //游玩
    pause,       //暂停
    Over         //结束
}


export class GameStatus  {

    // 设置游戏状态变量gamestate
    public static gamestate: GameState = GameState.Login;

    // 获取游戏状态
    public static getGameState(){
        
        return this.gamestate;
    }


    //设置gamestate状态为game login
    public static setGameStateLogin(){

        this.gamestate = GameState.Login;
    }

    //设置gamestate状态为game reday
    public static setGameStateRedey(){

        this.gamestate = GameState.Ready;

    }

    //设置gamestate状态为game play
    public static setGameStatePlay(){

        this.gamestate = GameState.Playing;
        
    }

    //设置gamestate状态为game play
    public static setGameStatePause(){

        this.gamestate = GameState.pause;
        
    }

    //设置gamestate状态为game over
    public static setGameStateOver(){

        this.gamestate = GameState.Over;
        
    }
    
}














