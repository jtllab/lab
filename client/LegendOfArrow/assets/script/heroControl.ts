import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode,Animation, Sprite, SpriteFrame, instantiate, Prefab, math, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact, find, sp, PolygonCollider2D, ProgressBar, BoxCollider2D } from 'cc';
const { ccclass, property } = _decorator;
import { bulletControl }  from './bulletControl';
import { enemyControl } from './enemyControl';

export enum HeroSpeedStatus {
    subSpeed = 0,  //减速
    normalSpeed,   //正常速度
    upSpeed     //加速buff
}

@ccclass('heroControl')
export class heroControl extends Component {

    left : boolean = false; //左
    right : boolean = false; //右 
    up : boolean = false; //上
    down : boolean = false; //下
    private _state : string = '';
    private _playerAni: Animation = null;

    heroSpeedStatus: HeroSpeedStatus = HeroSpeedStatus.normalSpeed;

    camera: Node;

    collider: Collider2D;

    //攻击间隔时间
    private _interval: number = 0.05;
    //攻击调用的函数
    private _attackMethod: Function = Node;

    //hero移动速度
    speed:number = 2;

    //移动速度倍率
    speedMult: number = 1;

    //移动速度异常倍率
    speedUnusualMult: number = 1;

    hp: number = 100;

    hpMax: number = 100;

    hpBar: ProgressBar;

    // hero移动单位偏移量，每次update时，英雄移动的偏移量等于 posOffset * posOffsetMul，posOffsetMul为0时，不移动。
    posOffsetMul: number = 0;
    // 保留 posOffset 的原因是这相当于是子弹射出方向，子弹的移动方向也是根据这个来的
    posOffset: math.Vec3 = new math.Vec3(0, -this.speed, 0);

    
    @property(SpriteFrame)
    bulleteicon : SpriteFrame = null;

    @property(Prefab)
    bulletPrefab : Prefab = null;

    start() {
        
    }
    onLoad()
    {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        this._playerAni = this.node.getComponent(Animation);
        this.camera = find("Canvas/Camera");
        // 挂载游戏攻击方法，后面攻击方法可以通过赋值来修改，比如出刀或者射击
        this._attackMethod =  this.fire
        this.attack()
        this.collider = this.node.getComponent(PolygonCollider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        this.collider.on(Contact2DType.END_CONTACT,this.onEndContact,this);
        this.hpBar = this.node.getChildByName("hpBar").getComponent(ProgressBar);
        this.hpBar.progress = this.hp/this.hpMax;
    }

    update(deltaTime: number) {
        // 注意，因为 Vec3 的计算方法都会修改自己的值，所以要先 clone 一个值再操作，避免修改到原始值
        var off = this.posOffset.clone();
        // 乘上 posOffsetMul，在不移动时，这个值为 0，乘以0后这个向量就是 0 了，就不会移动了
        off = off.multiplyScalar(this.posOffsetMul);
        // 用位置偏移量更新节点位置
        this.node.setPosition(this.node.getPosition().add(off));
        this.camera.setPosition(this.node.getPosition());
    }
    updatePosOffset() {
        this.posOffsetMul = 0;
        if (this.left || this.right || this.up || this.down) {
            // 如果有按键按下，就把速度设置乘数设置为1，这样就会移动了
            this.posOffsetMul = 1;
            if ((this.left && (this.up || this.down)) || (this.right && (this.up || this.down))){
                //斜向移动时，将速度减慢，避免向量相加速度加快
                this.speedMult = 0.7;
            }else {
                this.speedMult = 1;
            }
            // 根据按键情况更新方向
            // 这里有一个 BUG，如果同时按下横竖两个方向键，会导致英雄实际跑动方向更快，就留给你们自己修复了(提示，斜向走时，减小 posOffsetMul 的值)
            if (this.left) {
                //节点X坐标正方向移动
                this.posOffset.x = -this.speed * this.speedMult * this.speedUnusualMult;
                this.setState("hero_left");
            } else if (this.right) {
                //节点X坐标负方向移动
                this.posOffset.x = this.speed * this.speedMult * this.speedUnusualMult;
                this.setState("hero_right");
            } else {
                this.posOffset.x = 0;
            }
            if (this.up) {
                //节点y坐标正方向移动
                this.posOffset.y = this.speed * this.speedMult * this.speedUnusualMult;
                this.setState("hero_up");
            } else if (this.down) {
                //节点y坐标负方向移动 
                this.posOffset.y = -this.speed * this.speedMult * this.speedUnusualMult;
                this.setState("hero_down");
            } else {
                this.posOffset.y = 0;
            }
        } else {
            this.posOffsetMul = 0;
        }
    }

    //按下按键时
    onKeyDown(event:EventKeyboard)
    {
        switch(event.keyCode)
        {
            //键盘A触发
            case KeyCode.KEY_A:
                console.log('AAAA');
                this.left = true;
                this.setState('hero_left');
                break;
            
            //键盘D触发
            case KeyCode.KEY_D:
                console.log('DDDD');
                this.right = true;
                this.setState('hero_right');
                break;
             //键盘W触发
            case KeyCode.KEY_W:
                console.log('WWW');
                this.up = true;
                this.setState('hero_up');
                break;
             //键盘S触发
            case KeyCode.KEY_S:
                console.log('SSS');
                this.down = true;
                this.setState('hero_down');
                break;
        }
        this.updatePosOffset();

    }
    //按键起升时触发
    onKeyUp(enevt:EventKeyboard)
    {
        switch(enevt.keyCode)
        {
            case KeyCode.KEY_A:
                this.left = false;
                break;
            case KeyCode.KEY_D:
                this.right = false;
                break;
            case KeyCode.KEY_W:
                this.up = false;
                break;
            case KeyCode.KEY_S:
                this.down = false;
                break;
        }
        this.updatePosOffset();

    }

    setState(state){
        if (this._state == state) return;

        this._state = state;
        if (this._playerAni){
            this._playerAni.play(this._state);
        }
    }

    attack() {
        this.schedule(function() {
            this._attackMethod()
        }, this._interval);
    }

    //开火射击
    fire()
    {
        //新的子弹生成新的预制体
        let bullet:Node = instantiate(this.bulletPrefab);
        
        this.node.parent.addChild(bullet);
        // 注意，因为 Vec3 的计算方法都会修改自己的值，所以要先 clone 一个值再操作，避免修改到原始值
        var posOffset = this.posOffset.clone();
        //子弹图层设置等于父节点图层
       // bullet.layer = this.node.layer;
        //设置相对父节点位置
        bullet.setPosition(this.node.position);

        
        // 初始化子弹的移动速度，这包括的是子弹的方向和速度
        bullet.getComponent(bulletControl).posOffset = posOffset.multiplyScalar(5);

        //挂载到炮台节点下
        this.node.parent.addChild(bullet);
    }

    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null){
        switch (other.node.name){
            case "chiken":
                //玩家碰到怪物减速
                console.log(other._id);
                this.updateHeroSpeedStatus(HeroSpeedStatus.subSpeed);
                //削减血量
                this.hp -= other.node.getComponent(enemyControl).damage;
                console.log("remain hp :", this.hp);
                this.hpBar.progress = this.hp/this.hpMax;
                break;
        }
    }

    onEndContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        switch (other.node.name){
            case "chiken":
                //玩家离开怪物后恢复原速度倍率
                // console.log(other);
                this.updateHeroSpeedStatus(HeroSpeedStatus.normalSpeed);
                break;
        }
    }

    updateHeroSpeedStatus(status: HeroSpeedStatus){
        if (status = this.heroSpeedStatus){
            return;
        }
        this.heroSpeedStatus = status;
        if (status == HeroSpeedStatus.subSpeed){
            this.speedUnusualMult = 0.8;
        }else if (status == HeroSpeedStatus.upSpeed){
            this.speedUnusualMult = 1.2;
        }else {
            this.speedUnusualMult = 1;
        }
    }


}


