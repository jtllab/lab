import { _decorator, Component, Node, instantiate, Prefab, Vec3, find, NodeEventType } from 'cc';
import { chikenControl } from './chikenControl';
import { commonUtils } from './commonUtils';

const { ccclass, property } = _decorator;

@ccclass('enemyBorn')
export class enemyBorn extends Component {

    @property(Prefab)
    chikenPrefab : Prefab = null;

    monsterBornVec3 = new Vec3();

    hero: Node = null;

    minX: number = 480;

    maxX: number = 510;

    canvasX: number = 960;

    minY: number = 320;

    maxY: number = 350;

    canvasY: number = 640;

    // 定义一个计数器，初始值为 0
    counter: number = 0;

    chikenHP: number = 10;

    onLoad(){
        this.hero = find("Canvas/ch/hero");
        console.log(this.hero);
    }

    start() {
        // 在每隔 1 秒执行一次 chikenBorn 函数
        this.schedule(this.chikenBorn, 1.0);
    }

    update(deltaTime: number) {
        
    }

    chikenBorn()
    {
        let random = commonUtils.getRandomNum(1,2);
        if (random == 1){
            //x轴随机，y轴画面外
            this.monsterBornVec3.set(commonUtils.getRandomBinary() * (Math.random() * this.canvasX),commonUtils.getRandomBinary() * (this.maxY + (Math.random() * (this.maxY - this.minY))));
        }else if (random == 2){
            //y轴随机，x轴画面外
            this.monsterBornVec3.set(commonUtils.getRandomBinary() * (this.maxX + (Math.random() * (this.maxX - this.minX))),commonUtils.getRandomBinary() * (Math.random() * this.canvasY));
        }
        // console.log("随机数:",random ,"生成坐标", this.monsterBornVec3);
        let monsterNew = instantiate(this.chikenPrefab);
        //玩家移动后画面外
        monsterNew["hp"] = this.chikenHP
        monsterNew.setPosition(this.hero.getPosition().add(this.monsterBornVec3));
        this.node.addChild(monsterNew);

        //给chiken添加移动组件
        // chiken.addComponent(chikenControl);
        this.counter++;

        //数量等于50就不继续生成
        if(this.counter == 50)
        {
            this.unschedule(this.chikenBorn);
        }
    }

}


