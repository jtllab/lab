import { _decorator, Component, Node, instantiate, Prefab, Vec3, find, NodeEventType, RigidBody2D, Scheduler, director, CCInteger, View, math } from 'cc';
import { heroControl } from '../hero/heroControl';
import { commonUtils } from '../utils/commonUtils';


const { ccclass, property } = _decorator;

@ccclass('enemyBorn')
export class enemyBorn extends Component {

    @property(Prefab)

    rngPrefab : Prefab = null;

    @property(Prefab)
    zombieWorkerPrefab : Prefab = null;

    @property(Prefab)
    zombieDogPrefab : Prefab = null;

    @property(Prefab)
    batPrefab : Prefab = null;

    @property(Prefab)
    zombiePrefab : Prefab = null;

    @property(Prefab)
    xizhuangjiangshiPrefab : Prefab = null;    //西装僵尸

    @property(Prefab)
    shibingjiangshiPrefab : Prefab = null;    //士兵僵尸

    monsterBornVec3 = new Vec3();

    hero: Node = null;

    heroControl: heroControl;

    // 定义一个计数器，初始值为 0
    counter: number = 0;

    scheduler: Scheduler;

    visibleSize: math.Size;

    //怪物在画面外生成的偏移区域
    visibleOffset: number = 30;

    //游戏计时，用于不同时间产生不同的怪物
    timing: number = 0;

    onLoad(){
        this.hero = find("Canvas/hero");
        this.heroControl = this.hero.getComponent(heroControl);
        this.scheduler = director.getScheduler();
        this.visibleSize = View.instance.getVisibleSize();
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
            this.scheduler.schedule(this.zombieBorn, this, 0.3);
        //    this.scheduler.schedule(this.xizhuangjiangshiBron, this, 0.3);
            this.scheduler.schedule(this.shibingjiangshiBron, this, 0.3);
        }
        if (this.timing > 15 && this.timing < 30){
            this.scheduler.schedule(this.zombieWorkerBorn, this, 0.5);
        }
        if (this.timing > 30 && this.timing < 45){
            this.scheduler.schedule(this.rngBorn, this, 0.5);
        }
        if (this.timing > 45 && this.timing < 60){
            this.scheduler.unschedule(this.zombieBorn, this);
            this.scheduler.unschedule(this.zombieWorkerBorn, this);
            this.scheduler.unschedule(this.rngBorn, this);
            this.scheduler.schedule(this.zombieDogBorn, this, 0.5);
        }
        if (this.timing > 60){
            this.scheduler.schedule(this.batBorn, this, 0.3);
        }
    }

    rngBorn() {
        this.enemyBaseBorn(this.rngPrefab);
    }

    zombieWorkerBorn(){
        this.enemyBaseBorn(this.zombieWorkerPrefab);
    }

    zombieDogBorn() {
        this.enemyBaseBorn(this.zombieDogPrefab);
    }

    batBorn() {
        this.enemyBaseBorn(this.batPrefab);
    }

    zombieBorn() {
        this.enemyBaseBorn(this.zombiePrefab);
    }

    shibingjiangshiBron(){
        // this.enemyBaseBorn(this.shibingjiangshiPrefab);
    }

    xizhuangjiangshiBron() {
        // this.enemyBaseBorn(this.xizhuangjiangshiPrefab);
    }



    enemyBaseBorn(enemyPrefab: Prefab){
        let random = commonUtils.getRandomNum(1,2);
        if (random == 1){
            //x轴随机，y轴画面外
            this.monsterBornVec3.set(commonUtils.getRandomBinary() * (Math.random() * this.visibleSize.x),
                commonUtils.getRandomBinary() * ((this.visibleSize.y / 2 + this.visibleOffset) + (Math.random() * ((this.visibleSize.y / 2 + this.visibleOffset) - (this.visibleSize.y / 2)))));
        }else if (random == 2){
            //y轴随机，x轴画面外
            this.monsterBornVec3.set(commonUtils.getRandomBinary() * ((this.visibleSize.x / 2 + this.visibleOffset) + (Math.random() * ((this.visibleSize.x / 2 + this.visibleOffset) - (this.visibleSize.x / 2)))),
                commonUtils.getRandomBinary() * (Math.random() * this.visibleSize.y));
        }
        // console.log("随机数:",random ,"生成坐标", this.monsterBornVec3);
        let monsterNew = instantiate(enemyPrefab);
        //玩家移动后画面外
        monsterNew.setPosition(this.heroControl.playerMoveNode.getPosition().add(this.monsterBornVec3));
        this.node.addChild(monsterNew);


        this.counter++;

        //数量等于3就不继续生成
        if(this.counter >= 66)
        {
            // this.unschedule(this.batBorn);
        }
    }

    // batDied(){
        
    //     //鸡死后就减少数量
    //     this.counter--;
    //     // 当鸡的数量再次小于3时，重新开始生成鸡
    //     if (this.counter < 20) {
    //         // this.schedule(this.batBorn, 1.0);
    //     }

        
    // }

}


