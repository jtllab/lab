import { _decorator, Component, Node, Vec3, Quat, instantiate, Prefab, math, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('guardianControl')
export class guardianControl extends Component {

    //伤害
    damage: number = 20;

    playerMoveNode: Node = null;

    onLoad(){

     }

    start() {
     

    }

    fAngle:number = 0;
    fAngleSpeed:number = 3;
    radius:number = 200;
    update() {
        this.fAngle += (2 * Math.PI) / 360*this.fAngleSpeed; // 每帧增加的弧度
        if (this.fAngle > 2 * Math.PI) {
            this.fAngle -= 2 * Math.PI; // 避免弧度过大导致精度丢失
        }
        let centerPoint = this.playerMoveNode.getWorldPosition();
        let targetPoint = new math.Vec3(centerPoint.x + this.radius * Math.cos(this.fAngle), centerPoint.y + this.radius * Math.sin(this.fAngle));
        this.node.setWorldPosition(targetPoint);
        this.node.getComponent(RigidBody2D)["_body"].syncPositionToPhysics();
    }
}


