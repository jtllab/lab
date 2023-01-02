import { _decorator, Component, Node, instantiate, Prefab, Vec3, find, NodeEventType, RigidBody2D, Scheduler, director, CCInteger } from 'cc';
import { commonUtils } from '../utils/commonUtils';


const { ccclass, property } = _decorator;

@ccclass('enemyBorn')
export class enemyBorn extends Component {

    @property(Prefab)
    batPrefab : Prefab = null;

    @property(Prefab)
    dagongrenZombiePrefab : Prefab = null;

    @property(Prefab)
    hudiePrefab : Prefab = null;

    @property(Prefab)
    insectPrefab : Prefab = null;

    @property(Prefab)
    zombiePrefab : Prefab = null;

    monsterBornVec3 = new Vec3();

    hero: Node = null;

    minX: number = 360;

    maxX: number = 390;

    canvasX: number = 720;

    minY: number = 512;

    maxY: number = 542;

    canvasY: number = 1024;

    // 定义一个计数器，初始值为 0
    counter: number = 0;

    scheduler: Scheduler;

    //游戏计时，用于不同时间产生不同的怪物
    timing: number = 0;

    onLoad(){
        this.hero = find("Canvas/hero");
        this.scheduler = director.getScheduler();
        console.log(this.hero);
    }

    start() {
        // 在每隔 1 秒执行一次 chikenBorn 函数
        this.scheduler.schedule(this.timingCounter, this, 1);
    }

    update(deltaTime: number) {
        
    }

    timingCounter(){
        this.timing++;
        if (this.timing < 15){
            this.scheduler.schedule(this.batBorn, this, 0.5);
        }
        if (this.timing > 15 && this.timing < 30){
            this.scheduler.schedule(this.hudieBorn, this, 0.5);
        }
        if (this.timing > 30 && this.timing < 45){
            this.scheduler.schedule(this.insectBorn, this, 0.5);
        }
        if (this.timing > 45 && this.timing < 60){
            this.scheduler.unschedule(this.batBorn, this);
            this.scheduler.unschedule(this.hudieBorn, this);
            this.scheduler.unschedule(this.insectBorn, this);
            this.scheduler.schedule(this.zombieBorn, this, 0.3);
        }
        if (this.timing > 60){
            this.scheduler.schedule(this.dagongrenZombieBorn, this, 0.3);
        }
    }

    batBorn() {
        this.enemyBaseBorn(this.batPrefab);
    }

    dagongrenZombieBorn(){
        this.enemyBaseBorn(this.dagongrenZombiePrefab);
    }

    hudieBorn() {
        this.enemyBaseBorn(this.hudiePrefab);
    }

    insectBorn() {
        this.enemyBaseBorn(this.insectPrefab);
    }

    zombieBorn() {
        this.enemyBaseBorn(this.zombiePrefab);
    }



    enemyBaseBorn(enemyPrefab: Prefab){
        let random = commonUtils.getRandomNum(1,2);
        if (random == 1){
            //x轴随机，y轴画面外
            this.monsterBornVec3.set(commonUtils.getRandomBinary() * (Math.random() * this.canvasX),commonUtils.getRandomBinary() * (this.maxY + (Math.random() * (this.maxY - this.minY))));
        }else if (random == 2){
            //y轴随机，x轴画面外
            this.monsterBornVec3.set(commonUtils.getRandomBinary() * (this.maxX + (Math.random() * (this.maxX - this.minX))),commonUtils.getRandomBinary() * (Math.random() * this.canvasY));
        }
        // console.log("随机数:",random ,"生成坐标", this.monsterBornVec3);
        let monsterNew = instantiate(enemyPrefab);
        //玩家移动后画面外
        monsterNew.setPosition(this.hero.getPosition().add(this.monsterBornVec3));
        this.node.addChild(monsterNew);


        this.counter++;

        //数量等于3就不继续生成
        if(this.counter >= 66)
        {
            this.unschedule(this.batBorn);
        }
    }

    batDied(){
        
        //鸡死后就减少数量
        this.counter--;
        // 当鸡的数量再次小于3时，重新开始生成鸡
        if (this.counter < 20) {
            this.schedule(this.batBorn, 1.0);
        }

        
    }

}


