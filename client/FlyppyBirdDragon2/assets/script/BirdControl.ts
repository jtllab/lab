import { _decorator, Component, input, Input, Vec3, EventMouse, Contact2DType, Collider2D, IPhysics2DContact, BoxCollider2D, Node, UITransform } from 'cc';
import { SoundType } from './AudioSourceControl';
import { GameStatus, MainControl } from './MainControl';
const { ccclass, property } = _decorator;

@ccclass('BirdControl')
export class BirdControl extends Component {
    
    speed : number = 0;

    speedVec = new Vec3();

    @property(Node)
    canvas : Node = null;

    mainControl : MainControl;

    angle : number = 0;

    start() {

    }

    onLoad(){
        input.on(Input.EventType.MOUSE_DOWN,this.onMouseDown,this);
        let boxCollider = this.node.getComponent(BoxCollider2D);
        boxCollider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        this.mainControl = this.canvas.getComponent(MainControl);
    }

    update(deltaTime: number) {
        if (this.mainControl.gameStatus != GameStatus.GamePlaying){
            this.speed = 0;
            return;
        }
        this.speed -= 0.1;
        this.speedVec.set(0, this.node.getPosition().y + this.speed,0);
        this.node.setPosition(this.speedVec);
        this.angle = -(this.speed/2) * 30;
        if (this.angle >= 30) {
            this.angle = 30;
        }
        this.node.setRotationFromEuler(new Vec3(0,0,-this.angle));
        if (this.node.getPosition().y >= this.canvas.getComponent(UITransform).contentSize.y/2
            || this.node.getPosition().y <= -this.canvas.getComponent(UITransform).contentSize.y/2){
                this.mainControl.gameOverActive();
                this.mainControl.audioSourceControl.playSound(SoundType.SoundDie);
            }
    }

    onMouseDown(event : EventMouse){
        this.speed = 4;
        this.mainControl.audioSourceControl.playSound(SoundType.SoundFly);
    }

    onBeginContact (self : Collider2D, other : Collider2D, contact : IPhysics2DContact | null){
        //根据tag进行区分
        if (other.tag === 0){
            this.mainControl.gameOverActive();
            this.mainControl.audioSourceControl.playSound(SoundType.SoundDie);     
            console.log("game over",this.speed);   
        }else if (other.tag === 1){
            this.mainControl.gameScore++;
            this.mainControl.lableScore.string = this.mainControl.gameScore.toString();
            this.mainControl.audioSourceControl.playSound(SoundType.SoundScore);
        }
    }
}


