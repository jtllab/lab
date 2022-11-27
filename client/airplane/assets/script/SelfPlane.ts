import { _decorator, Component, Node, SystemEvent, systemEvent, EventTouch, input, Input, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    @property
    public speed = 5;

    start() {
        //源码,API已启弃用
        //systemEvent.on(SystemEvent.EventType.TOUCH_MOVE,this._touchMove,this);
        input.on(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);
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

    onTouchMove(event:EventTouch){
        const delta = event.getDelta();
        let pos= this.node.position;
        this.node.setPosition(pos.x+0.01*this.speed*delta.x,pos.y,pos.z-0.01*this.speed*delta.y)
    }
}


