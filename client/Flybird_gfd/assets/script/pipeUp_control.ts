import { _decorator, Component, Node, Vec3 } from 'cc';
import {  GameState, GameStatus } from './common';
const { ccclass, property } = _decorator;

@ccclass('pipeUp_control')
export class pipeUp_control extends Component {

    secChangeOffset = new Vec3(1, 0, 0);

    start() {

    }
    pipeUp_Reset(){
        
        var minY = -280;
        var maxY = -200;
        this.node.setPosition(new Vec3(130 ,minY + Math.random() * (maxY - minY)))
    }
 
    update(deltaTime: number) {
        if(GameStatus.gamestate == GameState.GamePlaying){

            this.node.setPosition(this.node.getPosition().subtract(this.secChangeOffset));
            if(this.node.getPosition().x <= -310){
                this.pipeUp_Reset();
            }

        }
       

    }
}


