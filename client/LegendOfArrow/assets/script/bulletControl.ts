import { _decorator, Component, Node, Vec2, NodePool, SpriteFrame, Sprite, Input, input, math, Vec3, Collider2D, IPhysics2DContact, PhysicsSystem2D, Contact2DType, sp, SkeletalAnimationState,Animation, CircleCollider2D, RigidBody2D} from 'cc';
import { heroControl } from './heroControl';
const { ccclass, property } = _decorator;
import { enemyBorn } from './enemyBorn';

@ccclass('bullet')
export class bulletControl extends Component {

    // 子弹的移动方向
    public posOffset: math.Vec3 = new math.Vec3(0, 0, 0);

    // 记录子弹的初始位置，用于检查子弹是否飞出太远，如果太远则销毁子弹，防止子弹一直存在浪费计算机资源
    private beginPos: Vec3;

    private _state : string = '';
    private _playerAni: Animation = null;

    collider: CircleCollider2D;

    //子弹伤害
    damage: number = 2;

    // 声明 enemyBorn 类型的变量
    enemyBorn: enemyBorn = null;

 
    @property(Animation)
    animation: Animation = null;

    start() {
        this.beginPos = this.node.getPosition();
    }

    onLoad() {
        // 每 1/60 秒调用一次 onTimer 函数
        this.schedule(this.onTimer, 1 / 60);
        this._playerAni = this.node.getComponent(Animation);
        this.collider = this.node.getComponent(CircleCollider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.onHitBegin,this);

        this.enemyBorn = this.node.parent.getComponent(enemyBorn);

        
    }

    // 由于我们这里使用定时器来更新子弹飞行位置，所以不需要在 update 函数中更新子弹位置
    update(deltaTime: number) {}

    // 定时器回调函数，更新子弹位置
    onTimer() {
        {
            // 检查子弹是否飞出太远，如果是则销毁子弹，防止一直存在浪费计算机资源
            if (this.node.getPosition().subtract(this.beginPos).length() > 1000) {
                // 取消这个定时器，防止一直存在浪费计算机资源
                this.unschedule(this.onTimer);
                //this.setState('exp1');
                // 销毁这个node就是销毁这个子弹
                this.node.destroy();
                return;
            }
        }
        // 更新子弹位置
        this.node.setPosition(this.node.getPosition().add(this.posOffset));
    }

    onHitBegin(self: Collider2D, other: Collider2D,contact: IPhysics2DContact | null){
        // console.log("hit begin self is:",self);
        switch (other.node.name){
            case "chiken":
                console.log("hit begin other is:",other);
                other.node.hp -= this.damage
                console.log(other.node.hp);
                //延时0.01s后销毁子弹
                this.scheduleOnce(() => {
                     this.node.destroy();// Code to be executed after the delay
                }, 0.01);  
                if (other.node.hp <= 0) {
                    console.log("chicken destory");
    
                    //延时0.1s后销毁鸡
                    this.scheduleOnce(() => {
                        other.node.destroy();// Code to be executed after the delay
                    }, 0.01);
                    this.enemyBorn.chikenDied();
                }
                break;
        }
    }

    
    //子弹爆炸效果

    setState(state){
    if (this._state == state) return;

        this._state = state;
        if (this._playerAni){
            this._playerAni.play(this._state);
        }
    // this.node.destroy();
        
    }
}

