import { _decorator, Component, Node, Vec3, Quat, instantiate, Prefab, math, RigidBody2D, Collider2D, IPhysics2DContact, Vec2, CircleCollider2D, Contact2DType, RigidBody } from 'cc';
import { enemyControl } from '../enemy/enemyControl';
const { ccclass, property } = _decorator;

@ccclass('guardianControl')
export class guardianControl extends Component {

    //伤害
    damage: number = 20;
    playerMoveNode: Node = null;
    //当前所在角度
    fAngle:number = 0;
    //当前转速
    fAngleSpeed:number = 2;
    //旋转半径
    radius:number = 200;

    collider: CircleCollider2D;
    onLoad(){
        this.collider = this.node.getComponent(CircleCollider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.onHitBegin,this);
    }

    setAngle(v: number) {
        this.fAngle = v;
    }

   start() {

   }
    update() {
        if (this.playerMoveNode == null) {
            return
        }
        this.fAngle += (2 * Math.PI) / 360*this.fAngleSpeed; // 每帧增加的弧度
        if (this.fAngle > 2 * Math.PI) {
            this.fAngle -= 2 * Math.PI; // 避免弧度过大导致精度丢失
        }
        let centerPoint = this.playerMoveNode.getWorldPosition();
        let targetPoint = new math.Vec3(centerPoint.x + this.radius * Math.cos(this.fAngle), centerPoint.y + this.radius * Math.sin(this.fAngle));
        this.node.setWorldPosition(targetPoint);
        this.node.getComponent(RigidBody2D)["_body"].syncPositionToPhysics();
    }

    onHitBegin(self: Collider2D, other: Collider2D,contact: IPhysics2DContact | null){
        // console.log("hit begin self is:",self);

        let enemyArray: string[] = ["bat", "hudie", "Zombie","ZombieWorker","Enemy_RNG","Zombie_Dog"]
        if (enemyArray.indexOf(other.node.name) != -1) {
            other.node.getComponent(enemyControl).hp -= this.damage
                this.node.getComponent(RigidBody2D).linearVelocity =  new Vec2(0,0);

                  if (other.node.getComponent(enemyControl).hp <= 0) {
                    //延时0.1s后销毁敌人
                    this.scheduleOnce(() => {
                        if (other.node){
                            console.log("enemy die die die");
                            other.node.destroy();
                        }
                    }, 0.01);
        }
        
    }
    
}
    
}


