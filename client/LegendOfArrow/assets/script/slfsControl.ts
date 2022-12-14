import { _decorator, Component, Node, ProgressBar, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact,Animation } from 'cc';
import { bulletControl } from './bulletControl';
const { ccclass, property } = _decorator;

@ccclass('slfsControl')
export class slfsControl extends Component {
    @property(ProgressBar)
    hp_bar : ProgressBar = null;

    //最大血量
    max_hp : number = 3000;
    //当前血量
    hp : number = 3000;

    @property(Animation)
    animation: Animation = null;

    onLoad()
    {
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        this.animation = this.node.getComponent(Animation);
    }
    start() {
        this.hp_bar.progress = this.hp/this.max_hp;
    }

    update(deltaTime: number) {
        //监测死灵法师血量
        if(this.hp <= 0)
        {
            this.hp = this.max_hp,
            console.log('复活')
        }
        
    }

    onBeginContact(selfCollider : Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact| null)
    {
        // 只在两个碰撞体开始接触时被调用一次
        //console.log('HIT');
        switch(otherCollider.node.name){
            case 'bulletPrefeb':
                console.log('HIT！！！')
                
                this.hp=this.hp-10;
                console.log(this.hp)
                this.hp_bar.progress = this.hp/this.max_hp
                //触发事件来播放爆炸动画
                otherCollider.node.getComponent(bulletControl).setState("exp1");
                //selfCollider.node.getComponent(Animation).play("slfs_byhit");
                this.animation.play("slfs_byhit");
                //otherCollider.node.destroy();
                break;
        }
    }

}


