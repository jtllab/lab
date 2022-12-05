import { _decorator, Component, Node, EventTouch, input, Input } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIMain')
export class UIMain extends Component {
    @property
    public planeSpeed = 5;

    @property(GameManager)
    public gameManager: GameManager = null;

    @property(Node)
    public playerPlane: Node = null;

    start() {
        //源码,API已启弃用
        //systemEvent.on(SystemEvent.EventType.TOUCH_MOVE,this._touchMove,this);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    // update(deltaTime: number) {
    //    
    // }
    // 源码,API已启弃用
    // _touchMove(touch:Touch,event:EventTouch){
    // const delta = touch.getDelta();
    // let pos= this.node.position;
    // this.node.setPosition(pos.x+0.01*this.speed*delta.x,pos.y,pos.z-0.01*this.speed*delta.y)
    //}

    onTouchMove(event: EventTouch) {
        const delta = event.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.01 * this.planeSpeed * delta.x, pos.y, pos.z - 0.01 * this.planeSpeed * delta.y)
    }
}


