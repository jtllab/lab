import { _decorator, Component, instantiate, math, Node, RigidBody2D, Vec3 } from 'cc';
import { SkillBase } from './SkillBase';
import { rocketControl } from '../weapons/rocketControl';
const { ccclass, property } = _decorator;

@ccclass('Rocket')
export class Rocket extends SkillBase {
    //发射火箭
    doSkill()
    {
        //新的子弹生成新的预制体
        let rocket:Node = instantiate(this._prefab);
        
        this._hero.parent.getChildByName("bullet").addChild(rocket);
        // 注意，因为 Vec3 的计算方法都会修改自己的值，所以要先 clone 一个值再操作，避免修改到原始值
        //var posOffset = this.posOffset.clone();
        //子弹图层设置等于父节点图层
       // bullet.layer = this.node.layer;
        //设置相对父节点位置
        rocket.setPosition(this._hero.position);

        let randomAngle = Math.random() * 2 * Math.PI;  // 随机生成 0 到 2π 之间的数
        let rocketDirection = new Vec3(Math.cos(randomAngle), Math.sin(randomAngle));  // 生成一个随机方向的向量

        
        // 初始化子弹的移动速度，这包括的是子弹的方向和速度
        rocket.getComponent(rocketControl).posOffset = rocketDirection.multiplyScalar(5);
        //console.log("rocketDirection", rocketDirection);
        //console.log("randomAngle", randomAngle);
        //console.log("rotation", rocket.rotation);
       // 初始化子弹的移动速度，这包括的是子弹的方向和速度
       let  speed = rocketDirection.multiplyScalar(2);
       let linearVelocity = new math.Vec2(speed.x, speed.y);
       rocket.getComponent(RigidBody2D).linearVelocity = linearVelocity;
       rocket.getComponent(RigidBody2D).fixedRotation = true;
       // 获取速度的方向，旋转到速度方向
       let angle = new math.Vec2(0,1).signAngle(linearVelocity.normalize())/Math.PI*180;
       rocket.eulerAngles = new Vec3(0,0,angle);


        
        //挂载到炮台节点下
        //this.node.parent.addChild(rocket);
    }
}


