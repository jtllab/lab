import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode,Animation, Sprite, SpriteFrame, instantiate, Prefab, math, RigidBody2D, Contact2DType, Collider2D, IPhysics2DContact, find, sp, PolygonCollider2D, ProgressBar, BoxCollider2D, absMax, director, Vec2, Vec3, View } from 'cc';
import { enemyControl } from '../enemy/enemyControl';
import { commonUtils } from '../utils/commonUtils';
import { rocketControl } from '../weapons/rocketControl';
import { expControl } from '../exp/expControl';
import { expMidControl } from '../exp/expMidControl';
import { expBigControl } from '../exp/expBigControl';
import { enemyBorn } from '../enemy/enemyBorn';
const { ccclass, property } = _decorator;


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



    //技能开关
    rocketSW : boolean = false;
    thunderSW : boolean = false;
    guardianSW : boolean = false;

    //用于挂在火箭预制体
    @property(Prefab)
    rocketPrefab : Prefab = null;

    // 闪电预制体
    @property(Prefab)
    thunderPrefab : Prefab = null;

    //用于挂在守护者预制体
    @property(Prefab)
    guardianPrefab : Prefab = null;
    

    // 失败时要弹出的ui
    @property(Prefab)
    missonFailPrefab : Prefab = null;

    // 玩家运动体节点，用于获取玩家的位置
    @property(Node)
    public playerMoveNode: Node;

    // 玩家动画节点，用于控制玩家玩家的动画
    @property(Node)
    public playerAnimationNode: Node;

    // 玩家血条节点
    @property(Node)
    public hpBarNode: Node;

    // 玩家肉体节点，除开武器啥的外部节点
    @property(Node)
    public playerBodyNode: Node;

    // 玩家肉体节点，除开武器啥的外部节点
    @property(Node)
    public playerWeaponNode: Node;

    // 只需实例一个失败UI
    missionFailUI:Node = null;

    heroSpeedStatus: HeroSpeedStatus = HeroSpeedStatus.normalSpeed;

    camera: Node;

    collider: Collider2D;

    //攻击间隔时间
    private _interval: number = 1;
    //攻击调用的函数
    private _attackMethod: Function = Node;

    //hero移动速度
    speed:number = 4;

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

    // level:exp
    levelInfo: any = {
        1:10,
        2:40,
        3:100,
        4:200,
        5:350,
        6:500
    }
    // 最高等级
    maxLevel: number = 6;
    // 当前等级
    level: number = 1;
    // 升级所需经验
    exp: number = this.levelInfo[this.level];
    
    @property(SpriteFrame)
    bulleteicon : SpriteFrame = null;

    @property(Prefab)
    bulletPrefab : Prefab = null;

    playerMoveRigidBody: RigidBody2D;

    start() {
        
    }
    onLoad()
    {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        this.camera = find("Canvas/Camera");
        // 挂载游戏攻击方法，后面攻击方法可以通过赋值来修改，比如出刀或者射击
        this._attackMethod =  this.rocketFire;

        this.createGurdian();

        this.attack();
        this.collider = this.playerMoveNode.getComponent(BoxCollider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        this.collider.on(Contact2DType.END_CONTACT,this.onEndContact,this);
        this.hpBar = this.hpBarNode.getComponent(ProgressBar);
        this.hpBar.progress = this.hp/this.hpMax;
        this.playerMoveRigidBody = this.playerMoveNode.getComponent(RigidBody2D);
        director.resume();
    }

    update(deltaTime: number) {
        // 注意，因为 Vec3 的计算方法都会修改自己的值，所以要先 clone 一个值再操作，避免修改到原始值
        var off = this.posOffset.clone();
        // 乘上 posOffsetMul，在不移动时，这个值为 0，乘以0后这个向量就是 0 了，就不会移动了
        off = off.multiplyScalar(this.posOffsetMul);
        // 用位置偏移量更新节点位置
        // this.playerMoveNode.setPosition(this.playerMoveNode.getPosition().add(off));
        this.playerMoveRigidBody.linearVelocity = commonUtils.convertVec3ToVec2(off);
        this.camera.setPosition(this.playerMoveNode.getPosition());
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
                this.playerBodyNode.setScale(-1,1,1);
                this.posOffset.x = -this.speed * this.speedMult * this.speedUnusualMult;
                this.setState("hero_left");
            } else if (this.right) {
                this.playerBodyNode.setScale(1,1,1);
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


    setDir(dir: Vec3) {
        if (dir.length() == 0) {
            // stop
            this.posOffsetMul = 0;
        } else {
            this.posOffsetMul = 1;
            this.posOffset = dir.normalize().multiplyScalar(this.speed * this.speedMult * this.speedUnusualMult);
            if(this.posOffset.x > 0){
                this.playerBodyNode.setScale(1,1,1);
            }
            if(this.posOffset.x < 0){
                this.playerBodyNode.setScale(-1,1,1);
            }

            // 获取速度的方向，旋转到速度方向
            let dirN = dir.clone().normalize();
            let dir2 = new Vec2(dirN.x, dirN.y);
            let angle = new math.Vec2(1,0).signAngle(dir2)/Math.PI*180;
            if (angle>=-90&& angle<=90) {
                this.playerWeaponNode.setScale(1,1,1);
            } else {
                this.playerWeaponNode.setScale(-1,1,1);
                angle+=180;
            }
            this.playerWeaponNode.eulerAngles = new Vec3(0,0,angle);
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

            case KeyCode.KEY_V:
                this.lightning();
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
        if (this.playerAnimationNode){
            this.playerAnimationNode.getComponent(Animation).play(this._state);
        }
    }

    attack() {
        this.schedule(function() {
            this._attackMethod()
        }, this._interval);
    }

     //发射火箭
     rocketFire()
     {
         //新的子弹生成新的预制体
         let rocket:Node = instantiate(this.rocketPrefab);
         
         this.node.getChildByName("bullet").addChild(rocket);
         // 注意，因为 Vec3 的计算方法都会修改自己的值，所以要先 clone 一个值再操作，避免修改到原始值
         //var posOffset = this.posOffset.clone();
         //子弹图层设置等于父节点图层
        // bullet.layer = this.node.layer;
         //设置相对父节点位置
         rocket.setPosition(this.playerMoveNode.position);

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

     
     // 闪电
     lightning() {
        let parent = this.node.parent;
        
        let visibleSize = View.instance.getVisibleSize();
        let pos = this.playerMoveNode.worldPosition;

        let enemyBornNode:Node = null;
        for (const c of parent.children) {
            if (c.getComponent(enemyBorn)){
                enemyBornNode = c;
                break;
            }
        }

        // 获取视野内敌人
        let enemiesInView : Array<Node> = new Array<Node>(); 
        
        enemyBornNode.children.forEach(c => {
            if (c.getComponent(enemyControl)){
                let c_pos = c.getWorldPosition();
                let distance = new Vec3();
                Vec3.subtract(distance, pos, c_pos);
                distance.x = Math.abs(distance.x);
                distance.y = Math.abs(distance.y);

                if (distance.x <= visibleSize.x/2 && distance.y <= visibleSize.y/2){
                    enemiesInView.push(c)
                }
            }
        });


        // 找到最近的敌人并攻击
        if (enemiesInView.length > 0) {
            let thunder:Node = instantiate(this.thunderPrefab);
            parent.addChild(thunder);

            let nearestEnemy:Node = enemiesInView[0];
            let minPos  = new Vec3();
            Vec3.subtract(minPos, pos, nearestEnemy.worldPosition);

            enemiesInView.forEach(e => {
                let e_pos = e.getWorldPosition();
                let distance = new Vec3();
                Vec3.subtract(distance, pos, e_pos);

                if (Vec3.len(distance) < Vec3.len(minPos)) {
                    minPos = distance;
                    nearestEnemy = e;
                }
            });
            let thunderAni = thunder.getComponent(Animation);
            thunder.setWorldPosition(nearestEnemy.worldPosition);
            thunderAni.play();

            // 杀伤范围内敌人
            let radius = 100;
            enemiesInView.forEach(e => {
                let distance = new Vec3();
                let e_pos = e.getWorldPosition();
                Vec3.subtract(distance, e_pos, nearestEnemy.worldPosition);

                if (Vec3.len(distance) < radius) {
                    // 敌人扣血
                    // e.getComponent(enemyControl)
                }
            });

            this.scheduleOnce(() => {
                thunder.destroy();
            }, 0.5);
        }
    }

     //生成守护者
     createGurdian()
     {
         let guardian:Node = instantiate(this.guardianPrefab);
         this.playerMoveNode.addChild(guardian);
         //let rotateAction = rotateBy(1, 360);
     }
 

    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null){
        //console.log("hit", other.node.name);
        
        switch (other.node.name){
            case "Zombie":
                other.node.getComponent(enemyControl).beginAttach();
                this.updateHeroSpeedStatus(HeroSpeedStatus.subSpeed);
                break;
            case "ZombieWorker":
                other.node.getComponent(enemyControl).beginAttach();
                this.updateHeroSpeedStatus(HeroSpeedStatus.subSpeed);
                break;
            case "Enemy_RNG":
                other.node.getComponent(enemyControl).beginAttach();
                this.updateHeroSpeedStatus(HeroSpeedStatus.subSpeed);
                break;   
            case "Zombie_Dog":
                other.node.getComponent(enemyControl).beginAttach();
                this.updateHeroSpeedStatus(HeroSpeedStatus.subSpeed);
                break;     
            case "insect":
                other.node.getComponent(enemyControl).beginAttach();
                this.updateHeroSpeedStatus(HeroSpeedStatus.subSpeed);
                break;    
            case "exp":
                this.exp -= other.node.getComponent(expControl).exp
                this.levelUpCheck();
                this.scheduleOnce(() => {
                    if (other.node){
                        other.node.destroy();// Code to be executed after the delay
                    }
                }, 0.1);
                break
            case "expMid":
                this.exp -= other.node.getComponent(expMidControl).exp
                this.levelUpCheck();
                this.scheduleOnce(() => {
                    if (other.node){
                        other.node.destroy();// Code to be executed after the delay
                    }
                }, 0.1);
                break

            case "expBig":
                this.exp -= other.node.getComponent(expBigControl).exp
                this.levelUpCheck();
                this.scheduleOnce(() => {
                    if (other.node){
                        other.node.destroy();// Code to be executed after the delay
                    }
                }, 0.1);
                break
        }
    }

    onEndContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        switch (other.node.name){
            case "Zombie":
                //玩家离开怪物后恢复原速度倍率
                // console.log(other);
                other.node.getComponent(enemyControl).stopAttach();
                this.updateHeroSpeedStatus(HeroSpeedStatus.normalSpeed);
                break;
            case "ZombieWorker":
                //玩家离开怪物后恢复原速度倍率
                // console.log(other);
                other.node.getComponent(enemyControl).stopAttach();
                this.updateHeroSpeedStatus(HeroSpeedStatus.normalSpeed);
                break;
            case "Enemy_RNG":
                //玩家离开怪物后恢复原速度倍率
                // console.log(other);
                other.node.getComponent(enemyControl).stopAttach();
                this.updateHeroSpeedStatus(HeroSpeedStatus.normalSpeed);
                break;
            case "Zombie_Dog":
                //玩家离开怪物后恢复原速度倍率
                // console.log(other);
                other.node.getComponent(enemyControl).stopAttach();
                this.updateHeroSpeedStatus(HeroSpeedStatus.normalSpeed);
                break;
            case "insect":
                //玩家离开怪物后恢复原速度倍率
                // console.log(other);
                other.node.getComponent(enemyControl).stopAttach();
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

    upateExp(){
        this.exp = this.levelInfo[this.level] + this.exp
    }

    levelUpCheck() {
        if (this.exp <= 0) {
            this.level = this.level == this.maxLevel ? this.level: this.level+1;
            this.upateExp();
            this.changeProperty();
            console.log("level up, current level %i", this.level);
        }
    }

    changeProperty() {
        console.log("Change Property");
    }

    // 英雄受到伤害
    getHurt(damage:number) {
        this.hp -= damage;
        this.hp = Math.max(this.hp, 0);
        this.hpBar.progress = this.hp / this.hpMax;
        
        // 英雄死亡
        if (this.hp <= 0 && this.missionFailUI==null) {
           this.missionFailUI = instantiate(this.missonFailPrefab);
           this.node.parent.addChild(this.missionFailUI);
           this.missionFailUI.setPosition(this.playerMoveNode.position);
           director.pause();
        }
    }
}


