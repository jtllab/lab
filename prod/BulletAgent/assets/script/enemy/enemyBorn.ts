import { _decorator, Component, Node, instantiate, Prefab, Vec3, find, NodeEventType, RigidBody2D, Scheduler, director, CCInteger } from 'cc';
import { commonUtils } from '../utils/commonUtils';


const { ccclass, property } = _decorator;

@ccclass('enemyBorn')
export class enemyBorn extends Component {

    @property(Prefab)
    batPrefab : Prefab = null;

    @property(Prefab)
    dagongrenZOmbiePrefab : Prefab = null;

    @property(Prefab)
    hudiePrefab : Prefab = null;

    @property(Prefab)
    inspectPrefab : Prefab = null;

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

    @property(CCInteger)
    monsterHp: number = 10;

    scheduler: Scheduler;

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
        if (this.timing < 30){
            this.scheduler.schedule(this.batBorn, this, 0.5);
        }
    }

    batBorn() {
        this.enemyBaseBorn(this.batPrefab);
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
        monsterNew["hp"] = this.monsterHp;
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


