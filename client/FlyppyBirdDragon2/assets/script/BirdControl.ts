import { _decorator, Component, input, Input, Vec3, EventMouse, Contact2DType, Collider2D, IPhysics2DContact, BoxCollider2D, Node } from 'cc';
import { GameStatus, MainControl } from './MainControl';
const { ccclass, property } = _decorator;

@ccclass('BirdControl')
export class BirdControl extends Component {
    
    speed : number = 0;

    speedVec = new Vec3();

    @property(Node)
    canvas : Node = null;

    mainControl : MainControl;

    start() {

    }

    onLoad(){
        input.on(Input.EventType.MOUSE_DOWN,this.onMouseDown,this);
        let boxCollider = this.node.getComponent(BoxCollider2D);
        boxCollider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        this.mainControl = this.canvas.getComponent(MainControl);
    }

    update(deltaTime: number) {
        console.log(this.mainControl.gameStatus);
        if (this.mainControl.gameStatus != GameStatus.GamePlaying){
            return;
        }
        console.log(this.node.getPosition());
        this.speed -= 0.1;
        this.speedVec.set(0, this.node.getPosition().y + this.speed,0);
        this.node.setPosition(this.speedVec);
    }

    onMouseDown(event : EventMouse){
        this.speed = 4;
    }

    onBeginContact (self : Collider2D, other : Collider2D, contact : IPhysics2DContact | null){
        //根据tag进行区分
        if (other.tag === 0){
            this.mainControl.gameOverActive();
        }else if (other.tag === 1){
            this.mainControl.gameScore++;
            this.mainControl.lableScore.string = this.mainControl.gameScore.toString();
        }
    }
}


