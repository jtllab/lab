import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { SkillBase } from './SkillBase';
import { guardianControl } from '../weapons/guardianControl';
const { ccclass, property } = _decorator;

@ccclass('Guardian')
export class Guardian extends SkillBase {
    guardianList: Array<Node> = new Array<Node>();

    constructor(parent:Node, hero:Node, prefab:Prefab){
        super(parent, hero, prefab);
        this.createGurdian();
        this.createGurdian();
    }

    levelUp(){
        this.scheduleOnce(() => {
            //升级生成守护者
            if(this.guardianList.length < 5){
                this.createGurdian();
            }
        }, 0.2);
    }


    //生成守护者
    createGurdian()
    {
    //生成预制体守护者
        let guardian:Node = instantiate(this._prefab);
        guardian.addComponent(guardianControl);
        let controller = guardian.getComponent(guardianControl);
        controller.playerMoveNode = this._hero;

    //guardian.addComponent(RigidBody);

        //this.playerMoveNode.addChild(guardian);
        this._hero.parent.getChildByName("bullet").addChild(guardian);

        this.guardianList.push(guardian);
        {
            // 平均所有的轮盘所处的弧度
            let angle = 2 * Math.PI / this.guardianList.length;
            // 计算每个轮盘的位置
            for (let i = 0; i < this.guardianList.length; i++) {
                let controller = this.guardianList[i].getComponent(guardianControl);
                controller.setAngle(angle * i);
            }
        }
    }
}


