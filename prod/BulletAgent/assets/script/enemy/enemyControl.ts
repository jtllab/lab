import { _decorator, Component, Node, Vec2, find, CCInteger, RigidBody2D, Scheduler, director } from 'cc';
import { heroControl } from '../hero/heroControl';
import { commonUtils } from '../utils/commonUtils';
const { ccclass, property } = _decorator;

@ccclass('enemyControl')
export class enemyControl extends Component {

    hero: Node;

    distVec = new Vec2();

    @property(CCInteger)
    speed: number;

    rigidBody: RigidBody2D;

    hp: number = 10;

    scheduler: Scheduler;

    heroControl: heroControl;

    //怪物碰撞的伤害
    @property(CCInteger)
    damage: number;

    onLoad(){
        this.scheduler = director.getScheduler();
    }

    start() {
        this.hero = find("Canvas/hero");
        this.heroControl = this.hero.getComponent(heroControl);
        this.rigidBody = this.node.getComponent(RigidBody2D);
    }

    update(deltaTime: number) {
        //玩家坐标减去怪物坐标得到距离，即方向
        this.distVec.set(commonUtils.convertVec3ToVec2(this.hero.getPosition().subtract(this.node.getPosition())));
        // console.log("distVec is", this.distVec);
        //使怪物正面朝着英雄
        if(this.distVec.x>0){
            this.node.setScale(-1,1);
        }else{
            this.node.setScale(1,1);
        }
        // console.log("newPos is", newPos);
        this.rigidBody.linearVelocity = this.distVec.normalize().multiplyScalar(this.speed * deltaTime)
    }

    beginAttach(){
        this.attachHero();
        this.scheduler.schedule(this.attachHero, this, 2);
    }

    stopAttach(){
        this.scheduler.unschedule(this.attachHero, this);
    }

    attachHero(){
        console.log("remain hp:", this.heroControl.hp);
        this.heroControl.hp -= this.damage;
        this.heroControl.hpBar.progress = this.heroControl.hp / this.heroControl.hpMax;
    }
}


