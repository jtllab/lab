import { _decorator, Component, Node, input, Input, EventMouse, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bird_control')
export class bird_control extends Component {

    
    speedVec = new Vec3();

    speed: number = 0;


    start() {
        this.node
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }


    onMouseDown(event: EventMouse) {
        
        this.speed = 1;
    }

    update(deltaTime: number) {

        this.speed -= 0.01
        this.speedVec.set(0, this.node.getPosition().y + this.speed,0);
        this.node.setPosition(this.speedVec);
    }
}


