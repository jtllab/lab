import { _decorator, Component, Node, director, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('mainControl')
export class mainControl extends Component {

    onLoad()
    {
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
    onBeginContact(selfCollider : Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact| null)
    {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('HIT');
    }
    
}
