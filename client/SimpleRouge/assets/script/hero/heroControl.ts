import { _decorator, Component, input, Input, EventKeyboard, KeyCode, Vec3, Animation, find, Node } from 'cc';
import { commonUtils } from '../Util/commonUtils';
const { ccclass, property } = _decorator;

export enum heroAni {
    UP = "hero1Up",
    DOWN = "hero1Down",
    LEFT = "hero1Left",
    RIGHT = "hero1Right"
} 

@ccclass('heroControl')
export class heroControl extends Component {

    up: boolean = false;
    down: boolean = false;
    left: boolean = false;
    right: boolean = false;

    camera: Node;

    //人物速度
    speed: number = 0;

    animState: string = "";

    //人物偏移量
    offsetVec3 = new Vec3();

    animation: Animation = null;

    onLoad(){
        input.on(Input.EventType.KEY_DOWN,this.onKeyBoardDown,this);
        input.on(Input.EventType.KEY_UP,this.onKeyBoardUp,this);
        this.animation = this.node.getComponent(Animation);
        this.camera = find("Canvas/Camera");
    }


    start() {
        
    }

    update(deltaTime: number) {
        this.heroMove(deltaTime);
        this.camera.setPosition(this.node.getPosition());
        //console.log(deltaTime);
    }

    heroMove(deltaTime: number){
        this.offsetVec3.set(0,0,0);
        if (this.left || this.right || this.up || this.down){
            if ((this.up && this.left) || (this.up && this.right) || (this.down && this.left) || (this.down && this.right)){
                this.speed = 1.5
            }else {
                this.speed = 2;
            }
            if (this.up){
                this.offsetVec3.add3f(0,this.speed,0);
            }else if (this.down){
                this.offsetVec3.add3f(0,-this.speed,0);
            }
            if (this.left){
                this.offsetVec3.add3f(-this.speed,0,0);
            }else if (this.right){
                this.offsetVec3.add3f(this.speed,0,0);
            }
            this.node.setPosition(this.node.getPosition().add(this.offsetVec3));
        }
    }



    onKeyBoardDown(event : EventKeyboard){
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.up = true;
                this.playAnimation(heroAni.UP);
                break;
            case KeyCode.KEY_S:
                this.down = true;
                this.playAnimation(heroAni.DOWN);
                break;
            case KeyCode.KEY_A:
                this.left = true;
                this.playAnimation(heroAni.LEFT);
                break;
            case KeyCode.KEY_D:
                this.right = true;
                this.playAnimation(heroAni.RIGHT);
                break;
        }
    }

    onKeyBoardUp(event : EventKeyboard){
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.left = false;
                this.animState = "";
                break;
            case KeyCode.KEY_W:
                this.up = false;
                this.animState = "";
                break;
            case KeyCode.KEY_S:
                this.down = false;
                this.animState = "";
                break;
            case KeyCode.KEY_D:
                this.right = false;
                this.animState = "";
                break;
        }
    }

    playAnimation(animEven: string){
        if (this.animState == animEven){
            return;
        }
        this.animState = animEven;
        this.animation.play(this.animState);
    }
}


