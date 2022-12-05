import { _decorator, Component, Node, ProgressBar, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('slfsControl')
export class slfsControl extends Component {
    @property(ProgressBar)
    hp_bar : ProgressBar = null;

    //最大血量
    max_hp : number = 300;
    //当前血量
    hp : number = 300;

    onLoad()
    {
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    start() {
        this.hp_bar.progress = this.hp/this.max_hp;
    }

    update(deltaTime: number) {
        
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
                break
        }
    }
}


