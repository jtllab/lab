import { CCInteger, instantiate, Vec3, _decorator, Prefab, Node, Scheduler, director } from 'cc';
import { commonUtils } from '../utils/commonUtils';
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
    aroundRadius: number = 250; 

    //攻击落点
    attachAim: Node; 

    //转速
    aroundSpeed: number = 5;

    //每帧的角度
    angleFrame: number = 0;

    //每帧增加的角度
    anglePerFrame: number = 0;

    damage: number = 1;

    scheduler: Scheduler;

    //瞄准间隔
    aimInterval: number = 0.3;

    onLoad(){
        this.scheduler = director.getScheduler();
    }

    init(parent:Node, hero:Node, prefab:Prefab, skillInterval=1, repeat=false){
        super.init(parent, hero, prefab,skillInterval,repeat,this.damage);
        this.attachAim = new Node();
        this.targetPos = this._hero.getWorldPosition().clone();
        console.log(this.targetPos);
        this.attachAim.setWorldPosition(this.targetPos.add(new Vec3(0,this.aroundRadius,0)));
        this._parent.addChild(this.attachAim);
        this.angleFrame = this.getAngle(this.attachAim.getWorldPosition());
        this.scheduler.schedule(this.generateAim,this,this.aimInterval);
    }

    start() {
        
    }

    update(deltaTime: number) {
        this.anglePerFrame = deltaTime * (360 / this.aroundSpeed);
        // console.log("anglePerFrame is",this.anglePerFrame);
        //计算弧度
        // console.log("angleFrame source is",this.angleFrame);
        this.angleFrame += this.anglePerFrame;
        // console.log("angleFrame after is", this.angleFrame);
        if (this.angleFrame >= 360){
            this.angleFrame = this.angleFrame % 360;
        }
        let radian = this.angleFrame * Math.PI / 180;
        // console.log("radian is", radian);
        this.targetPos = this._hero.getWorldPosition().clone();
        this.attachAim.setWorldPosition(new Vec3(this.targetPos.x + (this.aroundRadius * Math.cos(radian)), this.targetPos.y + (this.aroundRadius * Math.sin(radian))));
        console.log("attachAim is", this.attachAim.getWorldPosition());

    }

    //返回角度
    getAngle(aroundBodyPos: Vec3): number{
        return Math.atan2(aroundBodyPos.y - this.targetPos.y, aroundBodyPos.x - this.targetPos.x);
    }

    generateAim(){
        let droneMissileAim = instantiate(this._prefab);
        droneMissileAim.setWorldPosition(commonUtils.getRandomVec3AroundTarget(this.attachAim.getWorldPosition().clone(),1));
        this._parent.addChild(droneMissileAim);
        console.log(droneMissileAim.getWorldPosition());
    }


}


