import { _decorator, Component, Node, Prefab, Vec3, director, Scheduler, instantiate, Camera } from 'cc';
import { heroControl } from '../hero/heroControl';
import { commonUtils } from '../Util/commonUtils';
const { ccclass, property } = _decorator;

@ccclass('mainControl')
export class mainControl extends Component {

    hero: Node = null;

    @property(Prefab)
    bgPrefab: Prefab;

    @property(Prefab)
    monster1: Prefab;

    monsterBornVec3 = new Vec3();

    heroControl: heroControl = null;

    scheduler: Scheduler;

    //怪物生成坐标
    minX: number = 448;

    maxX: number = 470;

    canvasX: number = 896;

    minY: number = 320;

    maxY: number = 350;

    canvasY: number = 640;


    start() {

    }

    onLoad() {
        this.hero = this.node.getChildByName("Hero");
        let bg = this.node.getChildByName("Bg").getChildByName("Bg");
        this.heroControl = this.hero.getComponent(heroControl);
        this.scheduler = director.getScheduler();
        this.scheduler.schedule(this.monsterBorn, this, 1 / 2);
    }

    update(deltaTime: number) {
        
    }

    monsterBorn(){
        let random = commonUtils.getRandomNum(1,2);
        if (random == 1){
            //x轴随机，y轴画面外
            this.monsterBornVec3.set(commonUtils.getRandomBinary() * (Math.random() * this.canvasX),commonUtils.getRandomBinary() * (this.maxY + (Math.random() * (this.maxY - this.minY))));
        }else if (random == 2){
            //y轴随机，x轴画面外
            this.monsterBornVec3.set(commonUtils.getRandomBinary() * (this.maxX + (Math.random() * (this.maxX - this.minX))),commonUtils.getRandomBinary() * (Math.random() * this.canvasY));
        }
        // console.log("随机数:",random ,"生成坐标", this.monsterBornVec3);
        let monsterNew = instantiate(this.monster1);
        monsterNew.setPosition(this.hero.getPosition().add(this.monsterBornVec3));
        this.node.addChild(monsterNew);
    }

    onDestroy(){
        this.scheduler.destroy();
    }

    //生成地图
    mapBorn(x: number, y: number){
        let bg = instantiate(this.bgPrefab);
        bg.setPosition(x,y);
        this.node.getChildByName("Bg").addChild(bg);
    }

}


