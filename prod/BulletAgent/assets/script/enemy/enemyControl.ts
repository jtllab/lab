import { _decorator, Component, Node, Vec2, find, CCInteger, RigidBody2D } from 'cc';
import { commonUtils } from '../utils/commonUtils';
const { ccclass, property } = _decorator;

@ccclass('enemyControl')
export class enemyControl extends Component {

    hero: Node;

    distVec = new Vec2();

    speed: number = 70;

    rigidBody: RigidBody2D;

    //hp: number = 10;

    //怪物碰撞的伤害
    @property(CCInteger)
    damage: number;

    start() {
        this.hero = find("Canvas/hero");
        this.rigidBody = this.node.getComponent(RigidBody2D);
    }

    update(deltaTime: number) {
        //玩家坐标减去怪物坐标得到距离，即方向
        this.distVec.set(commonUtils.convertVec3ToVec2(this.hero.getPosition().subtract(this.node.getPosition())));
        // console.log("newPos is", newPos);
        this.rigidBody.linearVelocity = this.distVec.normalize().multiplyScalar(this.speed * deltaTime)
    }
}


