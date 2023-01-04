import { _decorator, Component, Node, math, Vec3, Collider2D, IPhysics2DContact, Contact2DType, Animation, CircleCollider2D, Prefab} from 'cc';
import { instantiate } from 'cc';
import { enemyControl } from '../../enemy/enemyControl';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bulletControl extends Component {

    // 子弹的移动方向
    public posOffset: math.Vec3 = new math.Vec3(0, 0, 0);

    // 记录子弹的初始位置，用于检查子弹是否飞出太远，如果太远则销毁子弹，防止子弹一直存在浪费计算机资源
    private beginPos: Vec3;

    private _state : string = '';
    private _playerAni: Animation = null;

    collider: CircleCollider2D;

    smallExp: string[] = ["Zombie", "hudie"]
    middleExp: string[] = ["bat"]
    bigExp: string[] = []

    //子弹伤害
    damage: number = 2;

    @property(Prefab)
    expPrefab : Prefab = null;

    @property(Prefab)
    expMidPrefab : Prefab = null;

    @property(Prefab)
    expBigPrefab : Prefab = null;
 
    @property(Animation)
    animation: Animation = null;

    start() {
        this.beginPos = this.node.getPosition();
    }

    onLoad() {
        // 每 1/60 秒调用一次 onTimer 函数
        this.schedule(this.onTimer, 1/60);
        this._playerAni = this.node.getComponent(Animation);
        this.collider = this.node.getComponent(CircleCollider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.onHitBegin,this);
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
    }

    onHitBegin(self: Collider2D, other: Collider2D,contact: IPhysics2DContact | null){
        let enemyArray: string[] = ["bat", "hudie", "Zombie"]
        if (enemyArray.indexOf(other.node.name) != -1) {
            other.node.getComponent(enemyControl).hp -= this.damage
                //延时0.01s后销毁子弹
                this.scheduleOnce(() => {
                     this.node.destroy();// Code to be executed after the delay
                }, 0.1);  
                if (other.node.getComponent(enemyControl).hp <= 0) {
                    console.log("bat destory");
                    //延时0.1s后销毁敌人
                    this.scheduleOnce(() => {
                        if (other.node){
                            this.generateExp(other.node)
                            console.log("enemy die die die");

                            other.node.destroy();// Code to be executed after the delay
                        }
                    }, 0.01);
                }
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

    generateExp(enemyNode: Node) {
        let exp:Node = null;
        if (this.smallExp.indexOf(enemyNode.name) !== -1) {
            exp = instantiate(this.expPrefab);
        } else if (this.middleExp.indexOf(enemyNode.name) !== -1) {
            exp = instantiate(this.expMidPrefab);
        } else if (this.bigExp.indexOf(enemyNode.name) !== -1) {
            exp = instantiate(this.expBigPrefab);
        } else {
            return 
        }
        this.node.parent.parent.parent.addChild(exp);
        exp.setPosition(enemyNode.getPosition())
    }
}

