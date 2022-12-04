import { _decorator, Component, Node, EventMouse, Vec3} from 'cc';
import {  GameState, GameStatus } from './common';
const { ccclass, property } = _decorator;




@ccclass('Btnstart_control')
export class Btnstart_control extends Component {



    start() {
        
        this.node.on(Node.EventType.MOUSE_DOWN, this.onStartGameClick, this);

    }

    onStartGameClick(event : EventMouse){
        
        if(GameStatus.gamestate == GameState.GameReady){
            this.node.active = false;
            GameStatus.setGameStatePlay();
        }

        if(GameStatus.gamestate == GameState.GameOver){
            GameStatus.setGameStateRedey();
        }

    }


    update(deltaTime: number) {
        
        
    }
}


