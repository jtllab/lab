import { _decorator, Component, Node, Canvas,Event,UITransform, input,Input,EventMouse, Animation, Vec3, Collider, log, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdControl')
export class BirdControl extends Component {
    
    @property
    setPosition = new Vec3();
    speedVec = new Vec3();
    x = new Vec3();
    //鸟的速度
    speed: number = 0;
    
    onLoad () {
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            //PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            //PhysicsSystem2D.instance.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            //PhysicsSystem2D.instance.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
    }
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact| null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
    }
    start() {

    }
   /* onCollisionEnter (other: Collider, self: Collider) {
        //game over
        log("game over");
    }*/

    update(deltaTime: number) {
        
        this.speed -= 0.02;
        this.speedVec.set(0,this.node.getPosition().y+this.speed,0);
        this.node.setPosition(this.speedVec);

        
        var angle = -(this.speed/2) * 30;
        if (angle >= 30) {
            angle = 30;
        }
        this.node.setRotationFromEuler(new Vec3(0,0,-angle));
        
    }
    onMouseDown(event: EventMouse) {
            this.speed = 1.5;
    }
    
}


