import { CCInteger, instantiate, Vec3, _decorator, Prefab, Node, find } from 'cc';
import { heroControl } from '../hero/heroControl';
import { SkillBase } from './SkillBase';
const { ccclass, property } = _decorator;

@ccclass('Drone')
export class Drone extends SkillBase {

    //围绕旋转的目标
    targetPos: Vec3 = null;

    //旋转的落点
    aroundPos: Vec3 = new Vec3();

    //旋转半径
    @property(CCInteger)
    aroundRadius: number = 1; 

    //攻击落点
    attachAim: Node; 

    //转速
    aroundSpeed: number = 2;

    //每帧的角度
    angleFrame: number = 0;

    //每帧增加的角度
    anglePerFrame: number = 0;

    heroControl: heroControl;

    constructor(parent:Node, hero:Node, prefab:Prefab){
        super(parent, find("Canvas/hero"), prefab);
        this.attachAim = instantiate(this._prefab);
        this.heroControl = this._hero.getComponent(heroControl);
        this.targetPos = this.heroControl.playerMoveNode.getPosition().clone();
        console.log(this.targetPos);
        this.attachAim.setPosition(this.targetPos.add(new Vec3(0,this.aroundRadius,0)));
        this.aroundPos = this.attachAim.getPosition().clone();
        console.log(this.aroundPos);
        this._parent.addChild(this.attachAim);
    }

    start() {
        
    }

    update(deltaTime: number) {
        this.anglePerFrame = deltaTime * (360 / this.aroundSpeed);
        //计算弧度
        this.angleFrame = this.getAngle(this.aroundPos);
        console.log(this.angleFrame);
        this.angleFrame += this.anglePerFrame;
        if (this.angleFrame >= 360){
            this.angleFrame = this.angleFrame % 360;
        }
        let radian = this.angleFrame * Math.PI / 180;
        this.attachAim.setPosition(new Vec3(this.targetPos.x + (this.aroundRadius * Math.cos(radian)), this.targetPos.y + (this.aroundRadius * Math.sin(radian))));

    }

    //返回角度
    getAngle(aroundBodyPos: Vec3){
        return Math.atan2(aroundBodyPos.y - this.targetPos.y, aroundBodyPos.x - this.targetPos.x);
    }
}


