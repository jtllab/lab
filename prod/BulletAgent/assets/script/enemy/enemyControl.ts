import { _decorator, Component, Node, Vec2, find, CCInteger, RigidBody2D, Scheduler, director, SpriteFrame, Sprite, Vec3 } from 'cc';
import { heroControl } from '../hero/heroControl';
import { commonUtils } from '../utils/commonUtils';
import { battlePanel } from '../battlePanel/battlePanel';
const { ccclass, property } = _decorator;

export enum enemyDirection {
    LEFT = 0,
    RIGHT
}

@ccclass('enemyControl')
export class enemyControl extends Component {

    hero: Node;

    distVec = new Vec2();

    rigidBody: RigidBody2D;

    @property(CCInteger)
    hp: number = 10;

    scheduler: Scheduler;

    heroControl: heroControl;

    //怪物碰撞的伤害
    @property(CCInteger)
    damage: number;

    @property(CCInteger)
    speed: number;

    @property(CCInteger)
    damageInterval: number;

    //怪物朝向
    // @property(SpriteFrame)
    // leftFrame: SpriteFrame;

    // @property(SpriteFrame)
    // rightFrame: SpriteFrame;

    enmeryDire: enemyDirection = null;

    sprite : Node;

    onLoad(){
        this.scheduler = director.getScheduler();
    }

    start() {
        this.hero = find("Canvas/hero");
        this.heroControl = this.hero.getComponent(heroControl);
        this.rigidBody = this.node.getComponent(RigidBody2D);
        this.sprite = this.node.getChildByName("ZombieBody");
        //初始怪物朝向

        // this.node.getComponent(Sprite).spriteFrame = this.leftFrame;
    }

    update(deltaTime: number) {
        //玩家坐标减去怪物坐标得到距离，即方向
        this.distVec.set(commonUtils.convertVec3ToVec2(this.hero.getPosition().subtract(this.node.getPosition())));
        // console.log("distVec is", this.distVec);
        //使怪物正面朝着英雄
        if(this.distVec.x>0){
            this.updateEnemyDirection(enemyDirection.RIGHT);
        }else{
            this.updateEnemyDirection(enemyDirection.LEFT);
        }
        // console.log("newPos is", newPos);
        this.rigidBody.linearVelocity = this.distVec.normalize().multiplyScalar(this.speed * deltaTime);
    }

    beginAttach(){
        this.attachHero();
        this.scheduler.schedule(this.attachHero, this, this.damageInterval);
    }

    stopAttach(){
        this.scheduler.unschedule(this.attachHero, this);
    }

    attachHero(){
        console.log("remain hp:", this.heroControl.hp);
        this.heroControl.getHurt(this.damage);
    }

    //更新怪物朝向
    updateEnemyDirection(direction: enemyDirection){
        if (this.enmeryDire == direction){
            return ;
        }
        this.enmeryDire = direction;
        if (this.enmeryDire == enemyDirection.LEFT){
            this.sprite.setScale(new Vec3(-1,1,0));
        }else {
            this.sprite.setScale(new Vec3(1,1,0));
        }
    }

    onDestroy(){
        if (this.node.parent.getChildByName("battlePanel")){
            this.node.parent.getChildByName("battlePanel").getComponent(battlePanel).killed += 1;
        }
    }
}


