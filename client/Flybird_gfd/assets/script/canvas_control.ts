import { _decorator, Component, Node, instantiate } from 'cc';
import { GameState, GameStatus } from './common';
const { ccclass, property } = _decorator;



@ccclass('canvas_control')
export class canvas_control extends Component {

    gameReday_active:boolean = false;

    start() {
        

    }

    update(deltaTime: number) {
        if(GameStatus.gamestate == GameState.GameOver){
            this.node.getChildByName("game_over").active = true;
            this.node.getChildByName("button_play").active = true;
            this.gameReday_active = true;

        }


        if(GameStatus.gamestate == GameState.GamePlaying){

            this.node.getChildByName("game_over").active = false;
            this.node.getChildByName("game_ready").active = false;

        }
        

        if(GameStatus.gamestate == GameState.GameReady){
            this.node.getChildByName("game_over").active = false;

            if(this.gameReday_active){
                this.node.getChildByName("game_ready").active = true;
            }
            else{
                this.node.getChildByName("game_ready").active = false;
            }

        }
    }
}


