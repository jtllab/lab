import { _decorator, Component, Node, Vec2, find, CCInteger, RigidBody2D, Scheduler, director, SpriteFrame, Sprite, Vec3, resources, Prefab, instantiate } from 'cc';
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

    defend = 0;

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
    @property(Vec3)
    leftVec3 = new Vec3();

    @property(Vec3)
    rightVec3 = new Vec3();

    enmeryDire: enemyDirection = null;

    @property(Node)
    sprite : Node;

    expPrefab: Prefab = null;
    expMiddlePrefab: Prefab = null;
    expBigPrefab: Prefab = null;

    smallExp: string[] = ["Zombie", "hudie"]
    middleExp: string[] = ["bat"]
    bigExp: string[] = []

    onLoad(){
        this.scheduler = director.getScheduler();
        resources.load("exp/exp", Prefab, (err, prefab) => {
            this.expPrefab = prefab;
        });
        resources.load("exp/expMid", Prefab, (err, prefab) => {
            this.expMiddlePrefab = prefab;
        });
        resources.load("exp/expBig", Prefab, (err, prefab) => {
            this.expBigPrefab = prefab;
        });
    }

    start() {
        this.hero = find("Canvas/hero");
        this.heroControl = this.hero.getComponent(heroControl);
        this.rigidBody = this.node.getComponent(RigidBody2D);
        //初始怪物朝向
        // console.log(this.sprite);
        // this.node.getComponent(Sprite).spriteFrame = this.leftFrame;
    }

    update(deltaTime: number) {
        //玩家坐标减去怪物坐标得到距离，即方向
        this.distVec.set(commonUtils.convertVec3ToVec2(this.heroControl.playerMoveNode.getPosition().subtract(this.node.getPosition())));
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
            this.sprite.setScale(this.leftVec3);
        }else {
            this.sprite.setScale(this.rightVec3);
        }
    }

    getHurt(damage: number) {
        let finalDamage = damage - this.defend;
        this.hp -= finalDamage;
        if (this.hp < 0) {
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 0.01);
        }
    }

    onDestroy(){
        let exp:Node = null;
        if (this.expPrefab && this.expMiddlePrefab && this.expBigPrefab){
            if (this.smallExp.indexOf(this.node.name) !== -1) {
                exp = instantiate(this.expPrefab);
            } else if (this.middleExp.indexOf(this.node.name) !== -1) {
                exp = instantiate(this.expMiddlePrefab);
            } else if (this.bigExp.indexOf(this.node.name) !== -1) {
                exp = instantiate(this.expBigPrefab);
            } else {
                console.warn("can't find this monster", this.node.name)
            }
            if (exp) {
                this.node.parent.addChild(exp);
                exp.setPosition(this.node.getPosition())
            }
        } else {
            console.warn("expPrefab is null")
        }
        
        if (this.node.parent.getChildByName("battlePanel")){
            this.node.parent.getChildByName("battlePanel").getComponent(battlePanel).killed += 1;
        }
    }
}


