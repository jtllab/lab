import { _decorator, Component, Node, Sprite, Vec3, Prefab, instantiate } from 'cc';
import {  GameState, GameStatus } from './common';
const { ccclass, property } = _decorator;

@ccclass('pipe_control')
export class pipe_control extends Component {

  
    secChangeOffset = new Vec3(1, 0, 0);

    start() {


    }

    pipeDown_Reset(){
        
        var minY = 190;
        var maxY = 300;
        this.node.setPosition(new Vec3(130 ,minY + Math.random() * (maxY - minY)))

    }


    update(deltaTime: number) {
        if(GameStatus.gamestate == GameState.GamePlaying){

            this.node.setPosition(this.node.getPosition().subtract(this.secChangeOffset));
            if(this.node.getPosition().x <= -310){
                this.pipeDown_Reset();
            }
        }



        
        
    }
}


