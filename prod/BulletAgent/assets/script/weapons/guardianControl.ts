import { _decorator, Component, Node, Vec3, Quat, instantiate, Prefab, math, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('guardianControl')
export class guardianControl extends Component {

    //伤害
    damage: number = 20;
    playerMoveNode: Node = null;
    //当前所在角度
    fAngle:number = 0;
    //当前转速
    fAngleSpeed:number = 1;
    //旋转半径
    radius:number = 200;
    onLoad(){

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
        // this.node.getComponent(RigidBody2D)["_body"].syncPositionToPhysics();
    }
    
}


