import { _decorator, Component, Node, Vec3, find, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemyControl')
export class enemyControl extends Component {

    hero: Node;

    distVec = new Vec3();

    speed: number = 70;

    //hp: number = 10;

    //怪物碰撞的伤害
    @property(CCInteger)
    damage: number;

    start() {
        this.hero = find("Canvas/ch/hero");
    }

    update(deltaTime: number) {
        //玩家坐标减去怪物坐标得到距离，即方向
        this.distVec.set(this.hero.getPosition().subtract(this.node.getPosition()));
        //将距离坐标归一并乘以速度得到下一秒怪物移动的方向
        let newPos = this.node.getPosition().add(this.distVec.normalize().multiplyScalar(this.speed * deltaTime));
        // console.log("newPos is", newPos);
        this.node.setPosition(newPos);
    }
}


