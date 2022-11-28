import { _decorator, Component, input, Input, Vec3, EventMouse, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact,EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdControl')
export class BirdControl extends Component {
    
    speed : number;

    speedVec = new Vec3();

    start() {

    }

    onLoad(){
        input.on(Input.EventType.MOUSE_DOWN,this.onMouseDown,this);
        PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
    }

    update(deltaTime: number) {
        this.speed -= 0.1;
        this.speedVec.set(0, this.node.getPosition().y + this.speed,0);
        this.node.setPosition(this.speedVec);
    }

    onMouseDown(event : EventMouse){
        this.speed = 4;
    }

    onBeginContact (self : Collider2D, other : Collider2D, contact : IPhysics2DContact | null){
        console.log("game over");
    }
}


