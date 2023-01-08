import { _decorator, Component, Node, math, Vec3, CircleCollider2D,Animation, Contact2DType, Collider2D, IPhysics2DContact, BoxCollider2D,RigidBody2D, Vec2, AudioClip, AudioSource } from 'cc';
import { enemyControl } from '../enemy/enemyControl';
import { bulletControl } from './revolver/bulletControl';
const { ccclass, property } = _decorator;

@ccclass('rocketControl')
export class rocketControl extends Component {


    // 火箭的移动方向
    public posOffset: math.Vec3 = new math.Vec3(0,0,0);

     // 记录火箭的初始位置，用于检查火箭是否飞出太远，如果太远则销毁，防止火箭一直存在浪费计算机资源
     private beginPos: Vec3;

     private _state : string = '';
     private _playerAni: Animation = null;

    //挂爆炸音效
     @property(AudioClip)
     boomSource : AudioSource;

     collider: BoxCollider2D;
 
     //火箭伤害
     damage: number = 20;



     onLoad(){
        this.collider = this.node.getComponent(BoxCollider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.onHitBegin,this);
     }

    start() {
        this.beginPos = this.node.getPosition();
        this.schedule(this.onTimer, 1/60);
    }

    update(deltaTime: number) {
        // 每 1/60 秒调用一次 onTimer 函数
        this._playerAni = this.node.getComponent(Animation);
      
    }

    onTimer() {
        {
            // 检查火箭是否飞出太远，如果是则销毁火箭，防止一直存在浪费计算机资源
            if (this.node.getPosition().subtract(this.beginPos).length() > 1000) {
                // 取消这个定时器，防止一直存在浪费计算机资源
                this.unschedule(this.onTimer);
                //this.setState('exp1');
                // 销毁这个node就是销毁这个火箭
                this.node.destroy();
                return;
            }
        }
        // 更新火箭位置
        //this.node.setPosition(this.node.getPosition().add(this.posOffset));
    }

    onHitBegin(self: Collider2D, other: Collider2D,contact: IPhysics2DContact | null){
        // console.log("hit begin self is:",self);

        let enemyArray: string[] = ["bat", "hudie", "Zombie","ZombieWorker","Enemy_RNG","Zombie_Dog"]
        if (enemyArray.indexOf(other.node.name) != -1) {
            other.node.getComponent(enemyControl).hp -= this.damage
            console.log("hit Zombie");
                this.node.getComponent(Animation).play("rocketBoom");

                this.scheduleOnce(() => {
                    this.boomSource.play();
                  }, 0.1);
                
                this.node.getComponent(RigidBody2D).linearVelocity =  new Vec2(0,0);
                this.scheduleOnce(() => {
                    this.node.destroy();
                  }, 0.5);
                  if (other.node.getComponent(enemyControl).hp <= 0) {
                    console.log("bat destory");
                    //延时0.1s后销毁敌人
                    this.scheduleOnce(() => {
                        if (other.node){
                            console.log("enemy die die die");
                            //other.node.getComponent(bulletControl).generateExp(other.node);
                            other.node.destroy();// Code to be executed after the delay
                        }
                    }, 0.01);
        }
        
    }
    
    
}


}
