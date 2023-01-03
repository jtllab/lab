import { _decorator, Component, Node, math, Vec3, CircleCollider2D,Animation, Contact2DType, Collider2D, IPhysics2DContact, BoxCollider2D,RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('rocketControl')
export class rocketControl extends Component {


    // 火箭的移动方向
    public posOffset: math.Vec3 = new math.Vec3(0,0,0);

     // 记录火箭的初始位置，用于检查火箭是否飞出太远，如果太远则销毁，防止火箭一直存在浪费计算机资源
     private beginPos: Vec3;

     private _state : string = '';
     private _playerAni: Animation = null;
 
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
        switch (other.node.name){
            case "bat":
                console.log("hit bat");
                break;
            case "insect":
                console.log("hit insect");
                break;
            case "hudie":
                console.log("hit hudie");
                break;   
            case "dagongrenZombie":
                console.log("hit dagongrenZombie");
                break;     
            case "Zombie":
                console.log("hit Zombie");
                this.node.getComponent(Animation).play("rocketBoom");
                this.node.getComponent(RigidBody2D).linearVelocity =  new Vec2(0,0);

                // 放大碰撞体的尺寸
                this.collider.size.x *= 10;
                this.collider.size.y *= 10;
                this.scheduleOnce(() => {
                    
                    this.node.destroy();
                  }, 0.5);
                break;    
        
        }
    }
}


