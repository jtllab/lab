import { _decorator, Component, Node, Prefab, instantiate, math, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;
import { bulletControl } from './revolver/bulletControl';
import { heroControl } from '../hero/heroControl';

@ccclass('weaponControl')
export class weaponControl extends Component {
    speed:number = 2;
    posOffset: math.Vec3 = new math.Vec3(0, -this.speed, 0);

    // 攻击间隔时间
    private _interval: number = 0.1;
    // 攻击方法
    private _attackMethod: Function = null;

    bulletArray: Node[] = new Array(5);

    @property(Prefab)
    bulletPrefab : Prefab = null;

    @property(Prefab)
    revolverPrefab : Prefab = null;

    @property(Node)
    playerNode: Node;

    @property(Node)
    bulletPoolNode: Node;

    onLoad(){
        this.attack()
    }

    start() {
        this.generateRevolver()
    }

    update(deltaTime: number) {
        
    }

    generateRevolver(){
        let revolver:Node = instantiate(this.revolverPrefab);
        revolver.setPosition(this.node.position.x + 15, this.node.position.y - 15, this.node.position.z)
        this.node.addChild(revolver)
        this._attackMethod = this.fire
    }

    attack() {
        this.schedule(function() {
            this._attackMethod()
        }, this._interval);
    }

    fire(){
        //新的子弹生成新的预制体
        let bullet:Node = instantiate(this.bulletPrefab);
        
        this.bulletPoolNode.addChild(bullet);
        // 注意，因为 Vec3 的计算方法都会修改自己的值，所以要先 clone 一个值再操作，避免修改到原始值
        var posOffset = this.playerNode.getComponent(heroControl).posOffset.clone();
        //子弹图层设置等于父节点图层
       // bullet.layer = this.node.layer;
        //设置相对父节点位置
        let position = this.node.getChildByName("revolver").worldPosition
        bullet.setWorldPosition(position.x + 10, position.y + 5, position.z);

        
        // 初始化子弹的移动速度，这包括的是子弹的方向和速度
        let  speed = posOffset.multiplyScalar(2);
        let linearVelocity = new math.Vec2(speed.x, speed.y);
        bullet.getComponent(RigidBody2D).linearVelocity = linearVelocity;
        bullet.getComponent(RigidBody2D).fixedRotation = true;
        // 获取速度的方向，旋转到速度方向
        let angle = new math.Vec2(1,0).signAngle(linearVelocity.normalize())/Math.PI*180;
        bullet.eulerAngles = new math.Vec3(0,0,angle);
    }
}


