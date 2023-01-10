import { _decorator, Component, EventKeyboard, input, Input, KeyCode, Node, Prefab } from 'cc';
import { Thunder } from './Thunder';
import { SkillBase } from './SkillBase';
import { Rocket } from './Rocket';
import { Guardian } from './Guardian';
import { Drone } from './Drone';
const { ccclass, property } = _decorator;

@ccclass('SkillMgr')
export class SkillMgr extends Component {
    // 闪电预制体
    @property(Prefab)
    thunderPrefab : Prefab = null;

    //用于挂在火箭预制体
    @property(Prefab)
    rocketPrefab : Prefab = null;

    //用于挂在守护者预制体
    @property(Prefab)
    guardianPrefab : Prefab = null;

    @property(Prefab)
    dronePrefab : Prefab = null;

    // 技能
    private _thuder: SkillBase = null;
    private _rocket: SkillBase = null;
    private _guardian: SkillBase = null;
    private _drone: SkillBase = null;

    private _skillArr: Array<SkillBase> = null;

    // 技能间隔
    private _skillInterval: number = 1;

    onLoad(){
        let heroNode = this.node.parent;
        let canvas = this.node.parent.parent.parent;



        this._skillArr = new Array<SkillBase>();

        //创建一个空结点，挂载技能上去
        let root = new Node();
        root.addComponent(Thunder);
        root.addComponent(Rocket);
        root.addComponent(Guardian);
        root.addComponent(Drone);

        //结点加到场景
        this.node.addChild(root);


        this._thuder = root.getComponent(Thunder);
        this._thuder.init(canvas, heroNode, this.thunderPrefab, 0.8);

        this._rocket = root.getComponent(Rocket); 
        this._rocket.init(canvas, heroNode, this.rocketPrefab, 1);

        this._guardian = root.getComponent(Guardian);
        this._guardian.init(canvas, heroNode, this.guardianPrefab);

        this._drone = root.getComponent(Drone);
        this._drone.init(canvas, heroNode, this.dronePrefab);

        this._skillArr.push(this._thuder);
        this._skillArr.push(this._rocket);
        this._skillArr.push(this._guardian);
        this._skillArr.push(this._drone);


        this.doSkillRepeat();
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }


    doSkill(){
        this._thuder.doSkill();
    }

    doSkillRepeat(){
        this._skillArr.forEach(skill => {
            skill.doSkillRepeat();
        });
    }

     //按下按键时触发技能，可用于测试
    onKeyDown(event:EventKeyboard)
    {
        switch(event.keyCode)
        {
            case KeyCode.KEY_C:
                this._thuder.doSkill();
                break;
        }
    }
}


