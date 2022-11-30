import { _decorator, Component, Node, CCObject, Sprite, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bg_move')
export class bg_move extends Component {

    @property(Sprite)
    bg1: Sprite = null;

    @property(Sprite)
    bg2: Sprite = null;


    @property
    secChangeOffset = new Vec3();

    @property
    resetOffset = new Vec3();

    

    start() {
        
    }

    onload(){

    }

    bg1_Reset() {
        this.bg1.node.setPosition(this.resetOffset);
    }

    bg2_Reset() {
        this.bg2.node.setPosition(this.resetOffset);
    }

    update(deltaTime: number) {

        this.bg1.node.setPosition(this.bg1.node.getPosition().subtract(this.secChangeOffset));
        this.bg2.node.setPosition(this.bg2.node.getPosition().subtract(this.secChangeOffset));
        if (this.bg1.node.getPosition().x <= -288 ){
            this.bg1_Reset()
        }
        if (this.bg2.node.getPosition().x <= -288 ){
            this.bg2_Reset()
        }

   
        
    }

    
}


